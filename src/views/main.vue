<template>
    <div id="main-div">
        <welcome v-resize="resize">
            <a-carousel :afterChange="doAfterChange">
                <div class="my-chart"></div>
                <div class="my-chart"></div>
                <div class="my-chart"></div>
                <div class="my-chart"></div>
                <div class="my-chart"></div>
            </a-carousel>
        </welcome>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import {axiosService} from '../service/axios-service';

    @Component
    export default class Main extends Vue {

        public chartList: echarts.ECharts[] = [];

        constructor() {
            super();
        }

        public mounted() {
            const chartOption: echarts.EChartOption = {
                xAxis: {
                    type: 'category',
                    axisLabel: {
                        fontSize: 18
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#FFF'
                        }
                    },
                    data: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期天']
                },
                yAxis: {
                    type: 'value',
                    axisLabel: {
                        fontSize: 18
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#FFF'
                        }
                    }
                },
                series: [
                    {
                        type: 'line',
                        smooth: true,
                        symbolSize: 10,
                        data: [480, 680, 360, 580, 420, 740, 300]
                    },
                    {
                        type: 'line',
                        smooth: true,
                        symbolSize: 10,
                        data: [380, 480, 300, 520, 280, 420, 180]
                    }
                ]
            };
            const elements = document.getElementsByClassName("my-chart");
            for (const e of elements) {
                const myChart: echarts.ECharts = this.$echarts.init(e as (HTMLDivElement | HTMLCanvasElement));
                // noinspection TypeScriptUnresolvedFunction
                myChart.setOption(chartOption);
                this.chartList.push(myChart);
                this.$elementResizeDetectorMaker.listenTo(e as HTMLElement, () => {
                    myChart.resize();
                });
            }
        }

        public doAfterChange(current: number) {
            axiosService.get("/spiritual-domain-example/welcome").then(value => {
                this.$message.info(value.data + "　" + (current + 1));
            }).catch(reason => {
                this.$message.error(reason.message);
            });
        }

        public beforeDestroy() {
            for (const chart of this.chartList) {
                chart.dispose();
            }
            const elements = document.getElementsByClassName("my-chart");
            for (const e of elements) {
                this.$elementResizeDetectorMaker.uninstall(e as HTMLElement);
            }
        }

        public resize(element: HTMLElement | { timer?: number }) {
            const e: { timer?: number } = element as { timer?: number };
            if (e.timer) {
                clearTimeout(e.timer);
            }
            e.timer = window.setTimeout(() => {
                const ee: HTMLElement = element as HTMLElement;
                this.$message.info('width: ' + ee.clientWidth + ', height: ' + ee.clientHeight);
                e.timer = undefined;
            }, 300);
        }

    }
</script>

<style scoped lang="less">
    #main-div {
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
        .my-chart {
            height: 100%;
        }
    }

    /deep/ .ant-carousel {
        width: 100%;
        height: 100%;
        padding: 8px;
        .slick-slider {
            height: 100%;
            background-color: #364d79;
        }
        .slick-list {
            height: 100%;
        }
        .slick-track {
            height: 100%;
        }
        .slick-slide {
            height: 100%;
        }
        .slick-slide > div {
            height: 100%;
        }
        .slick-dots li button {
            height: 8px;
        }
    }
</style>
