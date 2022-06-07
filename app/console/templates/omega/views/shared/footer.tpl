    </div>
</div>

<script type="text/javascript">

    let toastData = ${JSON.stringify(request.flash())};

    if(toastData.hasOwnProperty('message')){
        if(toastData.success){
            alert(toastData.message);
        }else{
            alert(toastData.error);
        }
    }

</script>