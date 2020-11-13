<template>
  <svg viewBox="0 0 720 400" class="svg-proj">
    <circle fill="#D6D6D6" cx="130" cy="225" r="91" id="circ_wave"></circle>
    <circle fill="none" stroke="#fff" cx="130" cy="225" r="258" stroke-width="335"></circle>
    <g transform="rotate(-90 130 225)">
      <circle class="circle-track" stroke-width="16" fill="none" stroke="#3EC1BE" cx="130" cy="225" r="115" stroke-dasharray="723" stroke-dashoffset="1441.104106092131" transform="rotate(-3 130 225)"></circle>
      <circle class="circle-train" stroke-width="16" fill="none" stroke="#FBB161" cx="130" cy="225" r="115" stroke-dasharray="723" stroke-dashoffset="722.5663103256525" transform="rotate(-1 130 225)"></circle>
    </g>
    <text x="130" y="214" text-anchor="middle" fill="#fff" class="per-wrap">
      <tspan class="percent" font-size="30">{{financingProgress}}％</tspan>
    </text>
    <text x="130" y="260" fill="#fff" text-anchor="middle" font-size="30" class="fsn bold">融资进度</text>
    <polyline fill="none" stroke-miterlimit="10" points="700,92 250,92 214.5,120"></polyline>
    <line x1="257" y1="173.5" x2="700" y2="173.5"></line>
    <line x1="257" y1="263.5" x2="700" y2="263.5"></line>
    <polyline fill="none" stroke-miterlimit="10" points="700,350.3 506.5,350.3 236.6,350.3 214.5,322.5"></polyline>
    <text x="700" y="85" text-anchor="end" fill="black">
      <tspan x="460" y="85"  class="Stitle">项目总投资：</tspan>
      <tspan x="700" y="85" class=" fz-large c-primary Skey" fill="#333">{{amount}}</tspan>
    </text>
    <text x="700" y="165" text-anchor="end" fill="black">
      <tspan x="460" y="165">预期收益率：</tspan>
      <tspan x="700" y="165" class="fz-large c-primary" fill="#333">{{irr}}%</tspan>
    </text>
    <text x="700" y="256" text-anchor="end" fill="black">
      <tspan x="460" y="256">项目开发商：</tspan>
      <tspan x="700" y="256" class="fz-large c-primary" fill="#333" v-if="this.projDevelopers != null">
        {{projDevelopers}}
      </tspan>
    </text>
    <text x="700" y="342" text-anchor="end" fill="black">
      <tspan x="460" y="342">意向投资方：</tspan>
      <tspan x="700" y="342" class="c-primary" v-if="potentialInvestorSize != null">{{potentialInvestorSize}}位</tspan>
    </text>
  </svg>
</template>

<script>
    export default {
        components: {},
        data() {
            return {}
        },
        props: {
          irr: String,
          amount: String,
          projDevelopers: {
            type: String,
            default: ''
          },
          potentialInvestorSize: Number,
          financingProgress: Number

        },
        watch: {},
        methods: {},
        filters: {},
        computed: {},
        created() {
        },
        mounted() {
        },
        destroyed() {
        }
    }
</script>

<style type="text/scss" lang="scss" scoped>
    @import '~@/assets/scss/reset.scss';
    @import '~@/assets/scss/mixin.scss';
  .svg-proj{
    margin-top: -10px;
    width: 100%;
    height: 11.2rem;
    overflow: hidden;
    font-size: 26px;
    fill: #333;
    line,polyline{
      stroke: #6ed2ff;
    }
    .per-wrap{
      display: block;
      .percent{
        display: inline-block;
        width: 50%;
      }
    }

    path{
      -webkit-transform: translate(0, 25%);
      transform: translate(0, 25%);
      -webkit-transition: -webkit-transform 5s linear;
      transition: -webkit-transform 5s linear;
      transition: transform 5s linear;
      transition: transform 5s linear, -webkit-transform 5s linear
    }
    .c-primary {
      stroke: transparent;
      fill: #3f83e6
    }
    .Stitle{
      width:100px;
      text-align: right;
    }
    .Skey{
      width:300px;
    }
  }
  svg:not(:root) {
    overflow: hidden;
  }
    .c-primary,
    .c-primary:visited {
      color: #3399e0;
    }

    #circ_wave {
      animation: mymove 8s infinite;
      -moz-animation: mymove 8s infinite;
      /* Firefox */
      -webkit-animation: mymove 8s infinite;
      /* Safari and Chrome */
      -o-animation: mymove 8s infinite;
      /* Opera */
    }

    @keyframes mymove {
      from {
        fill: #D6D6D6;
      }
      to {
        fill: #3A9ADD;
      }
    }

    @-moz-keyframes mymove
      /* Firefox */

    {
      from {
        fill: #D6D6D6;
      }
      to {
        fill: #3A9ADD;
      }
    }

    @-webkit-keyframes mymove
      /* Safari and Chrome
      {
      from {fill:#D6D6D6;}
      to {fill:#3A9ADD;}
      }

      @-o-keyframes mymove /* Opera */

    {
      from {
        fill: #D6D6D6;
      }
      to {
        fill: #3A9ADD;
      }
    }

</style>
