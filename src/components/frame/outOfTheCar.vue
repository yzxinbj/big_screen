<template>
    <div id="outOfTheCarInfo">
        <div class="info-box one">
            <div class="first-row">
                <div class="point"></div>
                <div class="line"></div>
                <div class="icon"></div>
            </div>
            <div class="second-row">
                <span class="car-count">1000</span>
                <span>公共出行</span>
            </div>
        </div>
        <div class="info-box two">
            <div class="first-row">
                <div class="point"></div>
                <div class="line"></div>
                <div class="icon"></div>
            </div>
            <div class="second-row">
                <span class="car-count">1000</span>
                <span>公共出行</span>
            </div>
        </div>
        <div class="info-box three">
            <div class="first-row">
                <div class="point"></div>
                <div class="line"></div>
                <div class="icon"></div>
            </div>
            <div class="second-row">
                <span class="car-count">1000</span>
                <span>公共出行</span>
            </div>
        </div>
        <div class="info-box four">
            <div class="first-row">
                <div class="point"></div>
                <div class="line"></div>
                <div class="icon"></div>
            </div>
            <div class="second-row">
                <span class="car-count">1000</span>
                <span>公共出行</span>
            </div>
        </div>
        <div class="info-box five">
            <div class="first-row">
                <div class="point"></div>
                <div class="line"></div>
                <div class="icon"></div>
            </div>
            <div class="second-row">
                <span class="car-count">1000</span>
                <span>公共出行</span>
            </div>
        </div>
    </div>
</template>
<style scoped lang="less">

    @url: '../../assets/images';

    .bg(@img) {
        background: url('@{url}/@{img}') no-repeat;
    }
    
    .info-box(@direction:row, @top: 15px, @right: 0px) {
        position: absolute;
        top: @top;
        right: @right;
        .first-row {
            height: 5px;
            display: flex;
            flex-flow: @direction nowrap;
            @white: rgba(255, 255, 255, 0.3);
            .point {
                width: 5px;
                height: 5px;
                border-radius: 50%;
                background: @white;
            }
            .line {
                width: 180px;
                height: 2px;
                background: @white;
                margin: 1px 0 0 0;
            }
            .icon {
                width: 87px;
                height: 4px;
                .bg('all_icon.png');
                margin: 0 5px;
                opacity: 0.8;
            }
        }

        .second-row {
            display: flex;
            flex-flow: @direction nowrap;
            justify-content: flex-end;
            color: rgba(255, 255, 255, 0.7);
            font-size: 13px;
            margin: 6px 5px 0 5px;
            .car-count {
                margin: 0 20px;
            }
        }
    }

    #outOfTheCarInfo {
        height: 180px;
        position: absolute;
        top: 100px;
        right: 20px;
        left: 20px;
        background: rgba(255, 255, 255, 0);

        .info-box {
            &.one {
                .info-box(reverse);
                .first-row .icon{
                    background-position: 0 -17*64px;
                }
            }
            &.two {
                .info-box(row-reverse, 50px, 277px);
                .first-row .icon{
                    background-position: 0 -15*64px;
                }
            }
            &.three{
                .info-box(row, 80px);
                .first-row .icon{
                    background-position: 0 -19*64px;
                }
            }
            &.four{
                .info-box(row-reverse, 105px, 277px);
                .first-row .icon{
                    background-position: 0 -16*64px;
                }
            }
            &.five{
                .info-box(row, 135px);
                .first-row .icon{
                    background-position: 0 -18*64px;
                }
            }
        }
    }
</style>