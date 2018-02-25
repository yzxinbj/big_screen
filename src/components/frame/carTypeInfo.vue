<template>
    <div id="carTypeInfoBox">
        <div class="car-type-row one">
            <div class="car-type-info-title">其他：34.1%</div>
            <div class="car-type-icon"></div>
            <div class="car-type-line"></div>
        </div>
        <div class="car-type-row two">
            <div class="car-type-info-title">厢式货车4.2米：23.2%</div>
            <div class="car-type-icon"></div>
            <div class="car-type-line"></div>
        </div>
        <div class="car-type-row three">
            <div class="car-type-info-title">小面：12.1%</div>
            <div class="car-type-icon"></div>
            <div class="car-type-line"></div>
        </div>
        <div class="car-type-row four">
            <div class="car-type-info-title">平顶金杯：20.4%</div>
            <div class="car-type-icon"></div>
            <div class="car-type-line"></div>
        </div>
        <div class="car-type-row five">
            <div class="car-type-info-title">高顶金杯：10.2%</div>
            <div class="car-type-icon"></div>
            <div class="car-type-line"></div>
        </div>
    </div>
</template>
<style lang="less">
    @url: '../../assets/images';

    .bg(@img) {
        background: url('@{url}/@{img}') no-repeat;
    }

    @keyframes rotate-fresh {
        from { transform: rotate(0deg) }
        to {
            transform: rotate(360deg);
            transition: all 0.6s;
        }
    }
    
    .car-type-row {
        display: flex;
        flex-flow: row nowrap;
        color: rgba(255,255,255,0.7);
        font-size: 14px;
        position: absolute;
        width: 235px;

        .icon() {
            .bg('all_icon.png');
            width: 16px;
            height: 16px;
        }

        .car-type-info-title {
            margin: 0 5px;
        }
        
        .car-type-icon {
            .icon();
            background-position: 0 -8*64px;
            animation: rotate-fresh 3s infinite linear
        }

        .car-type-line {
            flex-grow: 1;
            height: 2px;
            background: rgba(255, 255, 255, 0.3);
            margin: 7px 0 0 0;
        }

        &.one {
            top: 82px;
            left: 21px;
            .car-type-icon {
                background-position: 0 -8*64px;
            }
        }

        &.two {
            top: 52px;
            right: 21px;
            width: 260px;
            flex-direction: row-reverse;
            .car-type-icon {
                background-position: 0 -9*64px;
            }

        }

        &.three {
            top: 92px;
            right: 21px;
            width: 225px;
            flex-direction: row-reverse;
            .car-type-icon {
                background-position: 0 -10*64px;
            }
        }

        &.four {
            top: 142px;
            right: 21px;
            flex-direction: row-reverse;
            .car-type-icon {
                background-position: 0 -11*64px;
            }
        }

        &.five {
            top: 152px;
            left: 21px;
            width: 250px;
            .car-type-icon {
                background-position: 0 2-12*64px;
            }
        }
    }
</style>