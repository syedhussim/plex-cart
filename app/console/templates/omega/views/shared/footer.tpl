    </div>
</div>

<script type="text/javascript">

    let toastData = ${JSON.stringify(request.flash())};

    if(toastData.hasOwnProperty('message')){
        if(toastData.success){
            //alert(toastData.message);
        }else{
            //alert(toastData.error);
        }
    }

    document.querySelector('html').addEventListener('click', () => {
        document.querySelectorAll('.dropdown-menu').forEach(e => {
            if(e.classList.contains('dy-fx')){
                e.classList.remove('dy-fx');
                e.classList.add('dy-ne');
            }
        })
    });

</script>