import gulp from 'gulp';
import del from 'del';
import markdown from 'gulp-markdown';
import cheerio from 'gulp-cheerio';
import rename from 'gulp-rename';

export const clean = () => del([ 'index.html' ]);
/*Major Version.Minor Version.Build or Maintenance Version
 Major Version - 1로 시작해서 전체를 뒤엎을 정도의 큰 변화가 발생했을 때 이 수치를 올린다.
 Minor Version - 0으로 시작해서 없던 기능의 추가나 기존 기능의 수정 등의 변화가 발생했을때 이 수치를 올린다.
 Build or Maintenance Version - 자잘한 버그나 내부적 코드 보완 등의 변화가 발생했을때 이 수치를 올린다.*/
const CONVENTION_VER='1.6.2'; // 3번째 자리가 10이 될때 2번째 자리수가 1 이 된다.
const TITLE_TXT = 'guide';
const CSS_CODE=`<style>
    h1{font-size:60px;margin:1em 0;}
    body{font-size:14px;}
    blockquote>p{font-size:16px;}
    .btn-shortcut{display:block;padding:15px 12px 15px 20px;text-indent:0;line-height:1;font-size:14px;color:#fff;background-color:transparent;border-bottom: 1px solid rgba(255, 255, 255, 0.1);transition:all 0.35s cubic-bezier(0.22, 0.61, 0.36, 1);}
    .btn-shortcut:hover, .btn-shortcut.active{padding:20px 12px 18px 20px;text-indent:3px;text-decoration: none;color:#333;background-color:#fff;box-shadow:inset 0 -3px 10px 0 rgba(0, 0, 0, 0.12);border-bottom: 0;}
    .btn-top{z-index: 20;position:fixed;bottom:46px;right:50%;margin-right:-45%;}
    .btn-top>a{display:block;width:66px; height:66px; border-radius: 50%; border: 1px solid #dedede;} 
    .btn-top>a:hover{text-decoration: none;}
    .btn-top>a:before{content:'↑';padding:0 18px;font-size:50px;color:#337ab7;}
    .aver-table{width: 100%;margin-top:100px;text-align:center;border-top:2px solid #dedede;}
    .aver-table th{text-align:center;}
    .blind{  visibility: hidden; position: absolute; font-size: 0; width: 0; height: 0; line-height: 0;}
    .container{margin:0 0 180px 230px;}
    .side-bar{position:fixed;left:0;top:0;width:220px;height:100vh;overflow-y:scroll;color: #fff;background:linear-gradient(0deg,#5768f3,#1c45ef);}
    .m-bar{display: none;}
    @media (max-width:480px) {
        .nav-bar{
            position: fixed;
            width: 100%;
            left: 0;
            top: 0;
            height: 40px;
        }
        .nav-bar:before{
           content:'';
           position:absolute;
           width:100%;
           height:50px;
           background-color:#333;
        }
        
         .m-bar{
           display: block;
           position:absolute;
           top:10px;
           left:20px;
           width:32px;
           height:32px;
           background:#fff url(./hamburger-svgrepo-com.svg) 50% 50% no-repeat;
           background-size:32px;
        }
        .m-bar.active{
           background:#fff url(./clear-svgrepo-com.svg) 50% 50% no-repeat;
           background-size:32px;
        }
       
        .side-bar{transform:translateX(-100%);transition: transform .5s ease-out;}
        .side-bar.active{transform:translateX(0)}
        .container{overflow-x:hidden;overflow-y:auto;width:100%;margin:0 0 180px 0;}
    }
</style>`;
const JS_CODE=`<script>
  let percentItems=[];
  let completeItems=[];
  let deleteItems=[];
  let totalValue=0;
  let doc = document;
  
    function getDocHeight() {
        return Math.max(
            doc.body.scrollHeight, doc.documentElement.scrollHeight,
            doc.body.offsetHeight, doc.documentElement.offsetHeight,
            doc.body.clientHeight, doc.documentElement.clientHeight
        );
     }
    function getWindowHeight() {
        return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    }
  let timer = setTimeout(function () {
        clearTimeout(timer);
        $('table a').attr('target', '_blank');
        let i=0;
        let titleVer=$('h1');
        let replaceTitle=titleVer.text()+\'( ver ${CONVENTION_VER} )\';
        
        titleVer.text(replaceTitle);
        
        let titleMenus=$('h2');
        let len=titleMenus.length;
        let result='<div class="nav-bar"><div class="side-bar"><p style="margin-top:177px;padding: 0 20px;font-size:30px;">바로가기 메뉴</p>';
        for(i=0;i<len;i++){
           result+= '<a class="btn-shortcut" href="#'+titleMenus.eq(i).attr('id')+'" data-index="'+i+'" >'+titleMenus.eq(i).text()+'</a>';
        }
        result+='</div><div class="m-bar"></div></div>';
        titleMenus.eq(0).before(result);
        $('.btn-top').on('click', function(e) {
          $('html,body').stop().animate({scrollTop:0}, 700 );
        });
        $('.m-bar').on('click', function(e){
          $('.side-bar').toggleClass('active');
          $('.m-bar').toggleClass('active');
        });
        let oldScrollNum=-1;
        let scrollSpyBtnItems=$('.btn-shortcut');
        scrollSpyBtnItems.on('click', function(e){
            let scrollIdx = $(this).attr('href');
             let offsetY=$(scrollIdx).offset().top;
             $('html, body').stop().animate({scrollTop:offsetY}, 350 );
             
            activeMenus( parseInt( $(this).attr('data-index')) );
        });
        scrollSpyBtnItems.on('mouseenter', function(e){
            $(window).off('scroll.body-scroll');
        });
        scrollSpyBtnItems.on('mouseleave', function(e){
            $(window).on('scroll.body-scroll', updateScrollSpy );
        });
        
        function activeMenus(idx){
            console.log( idx  )
            if( oldScrollNum===idx ){ return; }
            scrollSpyBtnItems.eq(idx).addClass('active').siblings().removeClass('active');
            oldScrollNum=idx;
        }
      
        let maxScroll= getDocHeight() - getWindowHeight();
        function updateScrollSpy(){
            let scrollTop=$(this).scrollTop();
            
            scrollSpyBtnItems.each(function(i, item){
                let scrollIdx = $(this).attr('href');
                let offsetY=$(scrollIdx).offset().top;
                let th=$(scrollIdx).outerHeight(true);
                //
                if(scrollTop>=offsetY && scrollTop<offsetY+th ){
                     activeMenus( i );
                }else{
                    if( maxScroll <= scrollTop ){
                        activeMenus( scrollSpyBtnItems.length-1 );
                    }
                }
            });
        }
        $(window).on('scroll.body-scroll', updateScrollSpy );
        activeMenus( 0 );
    }, 450 );//end setTimeout
</script>`;
const LOAD_JQUERY=`<script src="./docs/jquery-1.10.2.min.js">//</script>`;
const HTML_TEMP=`<!doctype html>
<html lang="ko">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0" />
<meta http-equiv="X-UA-Compatible" content="ie=edge" />
<title>${TITLE_TXT}</title>
<link rel="stylesheet" href="docs/base.css" />
${CSS_CODE}
${LOAD_JQUERY}
</head>
<body>
<div id="header"><span class="blind">header</span></div>
<div class="container"></div>
<div class="btn-top"><a href="#header"><span class="blind">위로가기</span></a></div>
${ JS_CODE }
</body></html>`;

const guideMdToHTML=()=> {
    return gulp.src('./README.md')
        .pipe( markdown({
            sanitize: true,
            smartypants: true,
            smartLists:true,
            html: true
        }) )
        .pipe( cheerio(
            {
                run: ( $, file ) => {
                    $.root().empty();
                    $.root().append(`${HTML_TEMP}`);
                    // console.log(  file.contents.toString() )
                    $('.container').html( file.contents  );
                },
                parserOptions: {
                    decodeEntities:false  // true = 엔티티 코드화
                }
            }) )
        .pipe( rename('index.html'))
        .pipe( gulp.dest('./') )
}
const docs = gulp.series( clean, guideMdToHTML );

export { docs };

