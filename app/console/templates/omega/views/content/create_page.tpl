{{ await include('content/pages_list') }}

<div class="{{ pages.empty() ? 'app-container-full' : 'app-container' }}">
    <div class="app-content-container">
        <form method="post">
            <div class="app-content-left-panel">
            
                <div class="app-content-header">
                    <div class="inner-header">
                        <h4>page</h4>
                        
                            <div class="dy-fx pn-re">
                                <span class="btn-action" id="pageMenu"><i class="ico-eclipse"></i></span>
                                <div class="dropdown-menu wh-200-px dy-ne" id="pageContextMenu">
                                    <div class="menu-item" id="btnDeleteProduct" data-page_id="{{ page.id }}">
                                        <i class="ico-trash mr-10 minw-30-px"></i>
                                        <div class="dy-fx fx-fd-cn">
                                            <span>Delete</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                    </div>
                </div>

                <div class="dy-fx fx-jc-fe mb-20">
                    <input type="checkbox" id="chk_{{ page.id }}" value="1" name="active" {{ page.active == 1 ? 'checked' : '' }}>
                    <label for="chk_{{ page.id }}"></label>
                </div>

                <div class="mb-20">
                    <label class="mb-5 dy-bk fw-700 {{ errors.hasError('name', 'fc-9') }}">{{ errors.get('name', 'Name') }}</label>
                    {{ html.textbox('name', page) }}
                </div>

                <div class="mb-20">
                    <label class="mb-5 dy-bk fw-700 {{ errors.hasError('content', 'fc-9') }}">{{ errors.get('content', 'Content') }}</label>
                    {{ html.textarea('content', page).css('ht-400-px') }}
                </div>

                <div class="mb-20 dy-fx">
                    <input type="hidden" value="{{ page.id }}" name="id" />
                    <button type="submit" class="btn-commit">Save</button>
                </div>

            </div>
        </form>
    </div>
</div>

<script type="text/javascript">

    class App extends AppBase{

        mount(){

            this.click('#pageMenu', () => {

                event.stopPropagation();

                let e = document.querySelector('#pageContextMenu');
                let list = e.classList;

                if(list.contains('dy-ne')){
                    list.remove('dy-ne');
                    list.add('dy-fx');
                }else{
                    list.remove('dy-fx');
                    list.add('dy-ne');
                }
            });

            this.click('#btnDeleteProduct', async(sender) => {

                let response = await fetch('/catalog/pages/create', {
                    method : 'DELETE',
                    headers: {
                        'Content-type': 'application/json;charset=UTF-8'
                    },
                    body : JSON.stringify({ id : sender.dataset.page_id })
                });

                let result = await response.json();

                if(result.success){
                    window.location = '/catalog/pages';
                }
            });
        }
    }

    new App();

</script>