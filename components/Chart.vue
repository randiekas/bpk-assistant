<template>
    <div>
        <div ref="svgElementContainer"></div>
    </div>

</template>
<script>
import { OrgChart } from 'd3-org-chart';
export default {
    props: ['data', 'handelKlik'],
    data() {
        return {
            chartReference: null
        };
    },
    watch: {
        data: function() {
            this.renderChart();
        }
    },
    mounted: function(){
        this.renderChart();
        window.appchart=this;
    },
    methods: {
        renderChart: function() {
        if (!this.chartReference) {
            this.chartReference = new OrgChart();
        }
        this.chartReference
            .container(this.$refs.svgElementContainer) // node or css selector
            .data(this.data)
            .nodeHeight(d => 80)
            .nodeWidth(d => {
                return 220;
            })
            .childrenMargin(d => 50)
            .compactMarginBetween(d => 25)
            .compactMarginPair(d => 50)
            .neightbourMargin((a, b) => 25)
            .siblingsMargin(d => 25)
            .nodeContent(({ data, width, height, depth })=>{

                const colors = [
                    '#6E6B6F',
                    '#18A8B6',
                    '#F45754',
                    '#96C62C',
                    '#BD7E16',
                    '#802F74'
                    ];

                const color = colors[depth % colors.length];
                return `
                    <div style="font-family: 'Inter', sans-serif;background-color:white; position:absolute;margin-top:-1px; margin-left:-1px;width:${width}px;height:${height}px;border-radius:10px;border: 1px solid ${color}">
                        <button style="position:fixed; right:0; z-index:999999999999999999px; top:0; color:black">
                            <i onclick="window.appchart.handelKlik('tambah', '${data.id}')" data-v-f6275500="" aria-hidden="true" class="v-icon notranslate mdi mdi-plus"></i>
                        </button>
                        <div onclick="window.appchart.handelKlik('${data.id}')" style="height:100%">
                            <div style="font-size:15px;color:#08011E;margin-left:20px;padding-top:16px;">
                                ${data.nama}
                            </div>
                            <div style="color:#716E7B;margin-left:20px;margin-top:3px;font-size:10px;">
                                ${data.katakunci}
                            </div>
                        </div>
                    </div>
                `;

                // return `
                //     <div style="background-color:white; width:${width}px;height:${height}px; text-align:center; display:flex; justify-content:center; align-items:center">
                //     <button class="v-btn v-btn--is-elevated v-btn--has-bg v-btn--rounded theme--light v-size--default primary v-btn--block ">
                //         ${data.name}
                //     </button>
                //     </div>
                // `
            })
            .render();

            this.chartReference.layout('left')
            this.chartReference.setCentered("0")
            this.chartReference.expandAll()
            this.chartReference.fit()
        }
    }
};

</script>



