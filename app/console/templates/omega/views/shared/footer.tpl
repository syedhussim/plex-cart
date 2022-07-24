            </div>
        </div>

        <template id="tplToast">
            <div class="app-toast">
                <div class="dy-fx fx-jc-fe mr-20">
                    <i class="symbol-green">
                        <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 0 24 24" width="18px" fill="#fff"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/></svg>
                    </i>
                </div>
                <div data-name="message"></div>
            </div>
        </template>

        <script type="text/javascript">

            class System extends AppBase{

                mount(){

                    this.click('#app', () => {
                        document.querySelectorAll('.dropdown-menu').forEach(e => {
                            if(e.classList.contains('dy-fx')){
                                e.classList.remove('dy-fx');
                                e.classList.add('dy-ne');
                            }
                        })
                    });

                    let toastData = ${JSON.stringify(request.flash())};

                    if(toastData.hasOwnProperty('message')){
                        this.toast(toastData);
                    }
                }

                toast(data){
                    if(data.success){
                        this.render('toast', 'tplToast', data, {
                            mounted : (e) => { setTimeout(() => { e.replaceChildren(); }, 4000); }
                        });
                    }
                }
            }

            const sys = new System();

        </script>
    </body>
</html>