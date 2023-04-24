{{ await include('content/pages_list') }}

<div class="{{ pages.empty() ? 'app-container-full' : 'app-container' }} fx-jc-cr fx-ai-cr">
    <div class="dy-fx fx-fd-cn fx-ai-cr">

        {% if pages.empty() %}
            <form method="post" action="/content/pages/create" class="dy-fx fx-fd-cn fx-ai-cr">
                <h1>Content</h1>
                <p class="fs-18">You don't have any content pages yet.</p>
                <div class="mb-20 wh-400-px">
                    <label class="mb-5 dy-bk fw-700"></label>
                    {{ html.hidden('active', '1') }}
                    {{ html.textbox('name') }}
                    {{ html.hidden('url') }}
                </div>
                <input type="submit" class="btn-commit maxw-200-px" value="Create Page" />
            </form>
        {% else %}
            <h1>Content</h1>
            <p class="fs-18">Click on a page to view and edit details.</p>
        {% /if %}
    </div>
</div>

<script type="text/javascript">

    class Content extends AppBase{

        mount(){

            this.change('#name', (sender) => {
                document.querySelector("#url").value = url(sender.value);
            });
        }
    }

    new Content();

</script>