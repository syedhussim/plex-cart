{{ await include('content/pages_list') }}

<div class="{{ pages.empty() ? 'app-container-full' : 'app-container' }} fx-jc-cr fx-ai-cr">
    <div class="dy-fx fx-fd-cn fx-ai-cr">
        <h1>Content</h1>
        <p class="fs-18">You don't have any content pages yet.</p>
        <a href="/content/pages/create" class="btn-commit maxw-200-px">Create Page</a>
    </div>
</div>