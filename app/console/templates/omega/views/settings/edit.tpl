<div class="app-container-full">
    <div class="app-content-container">
        <form method="post">
            <div class="app-content-left-panel">
                <div class="app-content-header">
                    <div class="inner-header">
                        <h4 class="fw-700">Settings</h4>
                    </div>
                </div>

                <div class="mb-20">
                    <label class="mb-5 dy-bk fw-700 {{ errors.hasError('name', 'fc-9') }}">{{ errors.get('name', 'Name') }}</label>
                    {{ html.textbox('name', settings) }}
                </div>

                <div class="mb-20">
                    <label class="mb-5 dy-bk fw-700 {{ errors.hasError('url', 'fc-9') }}">{{ errors.get('url', 'URL') }}</label>
                    {{ html.textbox('url', settings) }}
                </div>

                <div class="mb-20">
                    <label class="mb-5 dy-bk fw-700 {{ errors.hasError('locale', 'fc-9') }}">{{ errors.get('locale', 'Regional Format') }}</label>
                    {{ 
                        html.select('locale', settings)
                        .fromArrayObject(locales, 'code', 'name')
                    }}
                </div>

                <div class="mb-20">
                    <label class="mb-5 dy-bk fw-700 {{ errors.hasError('timezone', 'fc-9') }}">{{ errors.get('timezone', 'Timezone') }}</label>
                    {{ 
                        html.select('timezone', settings)
                        .fromArrayObject(timeZones, 'id', 'name')
                    }}
                </div>

                <div class="mb-20 dy-fx">
                    <input type="hidden" value="{{ settings.id }}" name="id" />
                    <button type="submit" class="btn-commit">Save</button>
                </div>

            </div>
        </form>
    </div>
</div>