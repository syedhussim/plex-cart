{{ await include('content/pages_list') }}

<div class="{{ pages.empty() ? 'app-container-full' : 'app-container' }}">
    <div class="app-content-container">
        <form method="post">
            <div class="app-content-left-panel">
            
                <div class="app-content-header">
                    <div class="inner-header">
                        <h4>Template / <span class="fc-9">${page.name}</span></h4>
                    </div>
                </div>

                <div class="mb-20">
                    <label class="mb-5 dy-bk fw-700 {{ errors.hasError('name', 'fc-9') }}">{{ errors.get('name', 'Name') }}</label>
                    {{ html.textbox('name', template) }}
                </div>

                <div class="mb-20">
                    <label class="mb-5 dy-bk fw-700 {{ errors.hasError('template_file', 'fc-9') }}">{{ errors.get('template_file', 'Template File') }}</label>
                    {{ 
                        html.select('template_file', template)
                        .option('','')
                        .fromArray(templateFiles)
                    }}
                </div>

                <div class="app-content-section">
                    <div class="inner-section">
                        <h4 class="fw-700">Template Variables</h4>
                        <span class="btn-action" id="btnAddVariable"><i class="ico-add"></i></span>
                    </div>
                </div>

                <div id="variables">
                    {% foreach varName:varVal in Object.entries(template.variables) %}
                        <div class="mb-20">
                            <div>
                                <label class="mb-5 dy-bk fw-700 ">{{ varName }}</label>
                                {{ html.hidden('var_name', varName) }}
                            </div>
                            <div>
                                {{ html.textarea('var_value', varVal) }}
                            </div>
                        </div>
                    {% /foreach %}
                </div>

                <div class="mb-20 dy-fx">
                    <input type="hidden" value="{{ template.page_id }}" name="page_id" />
                    <input type="hidden" value="{{ template.id }}" name="id" />
                    <button type="submit" class="btn-commit">Save</button>
                </div>

            </div>
        </form>
    </div>
</div>

<template id="tplVariable">
    <div>
        <div>
            <input type="text" name="var_name" />
        </div>
        <div>
            <textarea name="var_value"></textarea>
        </div>
    </div>
</template>

<script type="text/javascript">

    class App extends AppBase{

        mount(){



            this.click('#btnAddVariable', (sender) => {
                this.render('variables', 'tplVariable', {});
            });
        }
    }

    new App();

</script>