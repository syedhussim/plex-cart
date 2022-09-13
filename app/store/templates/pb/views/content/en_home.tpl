{{ await include('shared/en_header') }}

<style>

.slider-background {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    position: relative;
    z-index: -1;
    height: 100vh;
    max-height: 810px;
    background-position: center bottom;
    background-repeat: no-repeat;
    background-size: cover;
}

.test:before {
    content: '';
    display: block;
    padding-top: 100%;
}

</style>

<div style="display: flex; justify-content:center;">
    <div class="maxw-1440-px wh-100-pc">
        <div class="slider-background" style="background-image:url(https://playboyfragrances.com/wp-content/themes/playboyfragrance/img/blocks/home-slider/hero-blank.jpg)">
            <div class="slider-background-overlay" style="display: block;"></div>
        </div>
    </div>
</div>

<div class="pt-150">
    <div class="dy-fx fx-jc-cr wh-100-pc">
        <div class="dy-fx maxw-1170-px">
            <div class="pl-15 pr-15">
                <h1>{{ heading_1 }}</h1>
                {{ heading_body }}
            </div>

            <div class="pl-15 pr-15">
                <div class="slider-image video-wrapper">
                    <a class="loader--disabled" href="https://vimeo.com/395434482/de27d2334b" target="blank" data-fancybox="" tabindex="0">
                        <img src="https://playboyfragrances.com/wp-content/uploads/2020/05/gallery.png" alt="gallery" width="756" height="641">
                    </a>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="pt-50">
    <div class="dy-fx fx-jc-cr wh-100-pc">
        <div class="dy-fx maxw-1170-px">
            <h2>Discover the fragrances</h2>
        </div>
    </div>
</div>

<div class="pt-50">
    <div class="dy-fx fx-jc-cr wh-100-pc">
        <div class="maxw-1440-px wh-100-pc dy-fx">
            <div class="dy-fx wh-50-pc test" style="background-image: url(https://playboyfragrances.com/wp-content/themes/playboyfragrance/img/blocks/featured-panels/for-him-bg@2x.jpg); background-size: cover;
background-position: center center;">A</div>
            <div class="dy-fx wh-50-pc">B</div>
        </div>
    </div>
</div>
