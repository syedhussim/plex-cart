{{ await include('content/pages_list') }}

<div class="{{ pages.empty() ? 'app-container-full' : 'app-container' }}">
    <div class="app-content-container">
        <form method="post">
            <div class="app-content-left-panel">
            
                <div class="app-content-header">
                    <div class="inner-header">
                        <h4>Related Pages / <span class="fc-9">{{ page.name }}</span></h4>
                    </div>
                </div>

                <div class="mb-20">
                    <div class="input-container listbox">
                        <ul>
                            {% foreach page in pages %}
                                <li>
                                    <div class="wh-100-pc pl-15 pt-15 pb-15 pr-15">
                                        <div>
                                            <span class="fw-700">{{ page.name }}</span>
                                        </div>
                                        <div class="fs-13 fc-6 mt-5">
                                            <span>{{ page.url }}</span>
                                        </div>
                                    </div>
                                    <div class="pr-15">
                                        <input type="checkbox" name="page_id" value="{{ page.id }}" id="chk_{{ page.id }}" {{ page.page_id ? 'checked' : '' }} />
                                        <label for="chk_{{ page.id }}"></label>
                                    </div>
                                </li>
                            {% /foreach %}
                        </ul>
                    </div>
                </div>

                <div class="mb-20 dy-fx fx-jc-fe">
                    <input type="hidden" value="{{ page.id }}" name="pid" />
                    <button type="submit" class="btn-commit">Save</button>
                </div>

            </div>
        </form>
    </div>
</div>

<script type="text/javascript">

    class App extends AppBase{

        mount(){

            this.click('#collectionMenu', () => {

                event.stopPropagation();

                let e = document.querySelector('#collectionContextMenu');

                let list = e.classList;

                if(list.contains('dy-ne')){
                    list.remove('dy-ne');
                    list.add('dy-fx');
                }else{
                    list.remove('dy-fx');
                    list.add('dy-ne');
                }
            });

            this.click('#btnConfirmDeletePage', () => {

                event.stopPropagation();

                let e = document.querySelector('#deleteMsg')
                e.classList.remove('dy-ne');
                e.classList.add('dy-fx');

                let ctxMenu = document.querySelector('#collectionContextMenu')
                ctxMenu.classList.remove('wh-200-px');
                ctxMenu.classList.add('wh-300-px');
            });

            this.click('#btnDeletePage', async (sender) => {

                let response = await fetch('/catalog/collections/create', {
                    method : 'DELETE',
                    headers: {
                        'Content-type': 'application/json;charset=UTF-8'
                    },
                    body : JSON.stringify({ id : sender.dataset.page_id })
                });

                let result = await response.json();

                if(result.success){
                    window.location = '/catalog/collections';
                }
            });
        }
    }

    new App();

</script>