${ await include('store/menu'); }

<div class="app-container">
    <div class="app-content-container">
        <form method="post">
            <div class="app-content-left-panel">
                <div class="app-content-header">
                    <div class="inner-header">
                        <h4 class="fw-700">Tax Class</h4>

                        <div class="dy-fx pn-re">
                            <span class="btn-action" id="taxMenu"><i class="ico-eclipse"></i></span>
                            <div class="dropdown-menu wh-200-px dy-ne" id="taxContextMenu">
                                <a class="menu-item" href="/store/taxes/create">
                                    <i class="ico-copy mr-10 minw-30-px"></i>
                                    <span>Create Tax Class</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </form>
    </div>
</div>

<script type="text/javascript">

    class App extends AppBase{

        mount(){

            this.click('#taxMenu', () => {

                event.stopPropagation();

                let e = document.querySelector('#taxContextMenu');
                let list = e.classList;

                if(list.contains('dy-ne')){
                    list.remove('dy-ne');
                    list.add('dy-fx');
                }else{
                    list.remove('dy-fx');
                    list.add('dy-ne');
                }
            });

        }
    }

    new App();

</script>