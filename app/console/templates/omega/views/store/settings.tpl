${ await include('store/menu'); }

<div class="app-container">
    <div class="app-content-container">
        <form method="post">
            <div class="app-content-left-panel">
                <div class="app-content-header">
                    <div class="inner-header">
                        <h3>General Settings</h3>
                    </div>
                </div>

                <div class="mb-20">
                    <label class="mb-5 dy-bk fw-700 ${errors.hasError('name', 'fc-9')}">${errors.get('name', 'Name')}</label>
                    ${html.textbox('name', settings)}
                </div>

                <div class="mb-20">
                    <label class="mb-5 dy-bk fw-700 ${errors.hasError('store_email', 'fc-9')}">${errors.get('store_email', 'Store Email')}</label>
                    ${html.textbox('store_email', settings)}
                </div>

                <div class="mb-20">
                    <label class="mb-5 dy-bk fw-700 ${errors.hasError('store_phone', 'fc-9')}">${errors.get('store_phone', 'Store Phone')}</label>
                    ${html.textbox('store_phone', settings)}
                </div>

                <div class="mb-20">
                    <label class="mb-5 dy-bk fw-700 ${errors.hasError('locale', 'fc-9')}">${errors.get('locale', 'Regional format')}</label>
                    ${
                        html.select('locale', settings)
                        .option('', '')
                        .fromArrayObject(locales, 'code', 'name')
                    }
                </div>

                <div class="mb-20 dy-fx">
                    <input type="hidden" value="${settings.id}" name="id" />
                    <button type="submit" class="btn-commit">Save</button>
                </div>

            </div>
        </form>
    </div>
</div>