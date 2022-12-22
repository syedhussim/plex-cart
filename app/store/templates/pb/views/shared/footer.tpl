        <footer>
            <div class="dy-fx fx-jc-cr bg-3">
                <div class="wh-100-pc maxw-1440-px dy-fx fx-jc-cr pt-35 pb-35">
                    <div class="wh-300-px dy-fx fx-jc-cr fx-ai-cr fx-fd-cn">
                        <a class="inverted">
                            <img src="https://playboyfragrances.com/wp-content/themes/playboyfragrance/img/logo.svg" class="wh-100-px">
                        </a>

                        <div class="dy-fx fx-ai-cr wh-100-pc mt-30 pn-re">
                            <input type="text" class="input-signup" placeholder="Newsletter signup" />
                            <input type="button" class="btn-signup"></button>
                        </div>

                        <div class="footer-nav">
                            <span><a href="">For Him</a></span>
                            <span><a href="">For Her</a></span>
                            <span><a href="">Body Mists</a></span>
                            <span><a href="">EN</a></span>
                        </div>

                        <div class="footer-social"> 
                            <a href="https://www.facebook.com/playboyfragrancesuk" target="_blank"><img src="/pb/public/images/icons/facebook.svg"></a>
                            <a href="https://www.instagram.com/playboyfragrances" target="_blank"><img src="/pb/public/images/icons/instagram.svg"></a>
                            <a href="https://twitter.com/playboy" target="_blank"><img src="/pb/public/images/icons/twitter.svg"></a>
                        </div>

                    </div>
                </div>
            </div>
            <div class="dy-fx fx-jc-cr">
                <div class="wh-100-pc maxw-1440-px dy-fx fx-jc-cr pt-35 pb-35">
                    <div class="maxw-700-px wh-100-pc footer-terms">
                        <p>©️ 2022 Playboy Enterprises International, Inc. Playboy and the Rabbit Head Design are trademarks of Playboy Enterprises International, Inc. and used under license by SA Designer Parfums.</p>
                        <p>SA Designer Parfums Ltd. Amertrans Park | Bushey Mill Lane | Watford | WD24 7JG | Herts | UK</p>
                        <p class="dy-fx fx-ai-cr wh-100-pc fx-jc-cr">
                            <a href="competition-terms">Competition terms</a>
                            <span>|</span>
                            <a href="terms-of-use">Terms of use</a>
                            <span>|</span>
                            <a href="privacy-policy">Privacy policy</a>
                            <span>|</span>
                            <a href="cookie-policy">Cookie policy</a>
                            <span>|</span>
                            <a href="modern-slavery-act">Modern slavery act</a>
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    </body>

    <script type="text/javascript">
        const navBar = {
            init : function(){
                document.body.onscroll = function(){
                    
                    const backdrop = document.querySelector('header .backdrop');

                    if(window.scrollY > 0){
                        backdrop.style.top = '0px';
                        backdrop.nextElementSibling.classList.remove('inverted');
                    }else{
                        backdrop.style.top = '-100px';
                        backdrop.nextElementSibling.classList.add('inverted');
                    }
                };
            }
        }

        navBar.init();
    </script>
</html>