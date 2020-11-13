import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index/index'
import News from '@/components/news/news'
import NewsList from '@/components/news/news-list/news-list'
import NewsDetail from '@/components/news/news-detail/news-detail'
import CIRINews from '@/components/news/CIRI-News/CIRI-News'
import goOut from '@/components/news/go-out/go-out'
import NewsHome from '@/components/news/home/home'
import NewsProject from '@/components/news/news-project/news-project'
import Activities from '@/components/news/CIRI-News/Activities/Activities'
import RecentNews from '@/components/news/CIRI-News/recent-news/recent-news'
import Investigation from '@/components/news/CIRI-News/investigation/investigation'
import Cooperation from '@/components/news/CIRI-News/cooperation/cooperation'
import Project from '@/components/project/project'
import ProjectLand from '@/components/project/project-land/project-land'
import ProjectDetail from '@/components/project/project-detail/project-detail'
import ProjectEvaluation from '@/components/project/project-detail/project-evaluation/project-evaluation'
import ProjectIntroduction from '@/components/project/project-detail/project-evaluation/project-introduction'
import ProjectFile from '@/components/project/project-detail/project-evaluation/project-file'
import FeasibilityAnalysis from '@/components/project/project-detail/project-evaluation/feasibility-analysis'
import ProjectDeveloper from '@/components/project/project-detail/project-evaluation/project-developer'
import ProjectProgress from '@/components/project/project-detail/project-progress/project-progress'
import ProgressDetail from '@/components/project/project-detail/project-progress/progress-detail'
import ProjectAnswering from '@/components/project/project-detail/project-answering/project-answering'
import InvestmentIntent from '@/components/project/project-detail/investment-intent/investment-intent'
import ParticipateInvestment
  from '@/components/project/project-detail/investment-intent/participate-investment/participate-investment'
import InvestmentEdit from '@/components/project/project-detail/investment-intent/investment-edit/investment-edit'
import InvestmentDetail from '@/components/project/project-detail/investment-intent/investment-detail'
import Msg from '@/components/msg/msg'
import Station from '@/components/msg/station/station'
import SystemNotification from '@/components/msg/system-notification/system-notification'
import Mine from '@/components/mine/mine'
import MyProfile from '@/components/mine/my-profile/my-profile'
import ChangeKey from '@/components/mine/my-profile/change-key'
import ChangeCountry from '@/components/mine/my-profile/change-country'
import FocusCountry from '@/components/mine/my-profile/focus-country'
import MemberCenter from '@/components/mine/member-center/member-center'
import OpenMember from '@/components/mine/member-center/open-member'
import MemberInduction from '@/components/mine/member-center/member-induction'
import Recharge from '@/components/mine/recharge/recharge'
import BillDetail from '@/components/mine/recharge/bill-detail'
import Payment from '@/components/mine/recharge/payment'
import paySuccessful from '@/components/mine/recharge/pay-successful'
import Scores from '@/components/mine/scores/scores'
import ScoresDetail from '@/components/mine/scores/scores-detail'
import Security from '@/components/mine/security/security'
import AboutUs from '@/components/mine/security/about-us/about-us'
import BrazilBranch from '@/components/mine/security/about-us/brazil-branch'
import BusinessArea from '@/components/mine/security/about-us/business-area'
import CompanyProfile from '@/components/mine/security/about-us/company-profile'
import ContactUs from '@/components/mine/security/about-us/contact-us'
import IranianBranch from '@/components/mine/security/about-us/iranian-branch'
import SecurityEmail from '@/components/mine/security/security-email/security-email'
import SecurityFeedback from '@/components/mine/security/security-feedback/security-feedback'
import SecurityLoginpwd from '@/components/mine/security/security-loginpwd/security-loginpwd'
import SecurityPhone from '@/components/mine/security/security-phone/security-phone'
import IdentityVerification from '@/components/mine/IdentityVerification/IdentityVerification'
import IdentitySuccess from '@/components/mine/IdentityVerification/identity'
import MemberDredge from '@/components/mine/member-center/member-dredge'
import MyFavorite from '@/components/mine/my-favorite/my-favorite'
import login from '@/components/login/login'
import Register from '@/components/login/register'
import Resetpwd from '@/components/login/resetpwd'
import Authcode from '@/components/login/authcode'
import Deal from '@/components/login/deal'
import Search from '@/components/search/search'

Vue.use(Router)
export default new Router({
  routes: [
    // 根路径
    {
      path: '/',
      redirect: '/index',
      component: Index
    },
    // 首页
    {
      path: '/index',
      component: Index,
      meta: {keepAlive: true}

    },
    // 搜索
    {
      path: '/search',
      component: Search,
    },
    // 登录
    {
      path: '/login',
      meta: {
        auth: false
      },
      component: login,
    },
    //资讯
    {
      path: '/news',
      component: News
    },
    //资讯列表
    {
      path: '/news/news-list',
      component: NewsList
    },
    //资讯详情
    {
      path: '/news/news-detail',
      component: NewsDetail
    },


    // 资讯
    /*{
      path: '/news',
      redirect: '/news/home',
      component: News,
      children: [
        // 资讯  走出去情报
        {
          path: 'go-out',
          component: goOut
        },
        // 资讯  首页推荐
        {
          path: 'home',
          component: NewsHome
        },
        // 资讯  项目情报
        {
          path: 'news-project',
          component: NewsProject
        },
        {
          path: 'CIRI-News',
          redirect: '/news/CIRI-News/Activities',
          component: CIRINews,
          children: [
            // 资讯  最新活动
            {
              path: 'Activities',
              component: Activities
            },
            // 资讯  最新动态
            {
              path: 'recent-news',
              component: RecentNews
            },
            // 资讯  海外考察
            {
              path: 'investigation',
              component: Investigation
            },
            {
              path: 'cooperation',
              component: Cooperation
            }
          ]
        }
      ]
    },*/
    // 资讯详情页
    /*{
      path: '/news/news-detail',
      component: NewsDetail
    },*/



    // 项目
    {
      path: '/project',
      component: Project,
      meta: {keepAlive: true}
    },
    // 项目着陆页
    {
      path: '/project/project-land',
      component: ProjectLand
    },
    // 项目详情页
    {
      path: '/project/project-detail',
      redirect: '/project/project-detail/project-evaluation',
      component: ProjectDetail,
      children: [
        // 项目评估
        {
          path: 'project-evaluation',
          redirect: '/project/project-detail/project-evaluation/project-introduction',
          component: ProjectEvaluation,
          children: [
            // 项目介绍
            {
              path: 'project-introduction',
              meta: {
                requireAuth: true,
                keep: true
              },
              component: ProjectIntroduction
            },
            // 项目文件
            {
              path: 'project-file',
              meta: {
                requireAuth: true,
              },
              component: ProjectFile
            },
            // 可行性分析
            {
              path: 'feasibility-analysis',
              meta: {
                requireAuth: true,
              },
              component: FeasibilityAnalysis
            },
            // 项目开发商
            {
              path: 'project-developer',
              meta: {
                requireAuth: true,
              },
              component: ProjectDeveloper
            }

          ]
        },
        // 项目进展
        {
          path: 'project-progress',
          meta: {
            requireAuth: true,
          },
          component: ProjectProgress
        },
        // 项目答疑
        {
          path: 'project-answering',
          meta: {
            requireAuth: true,
          },
          component: ProjectAnswering
        },
        // 投资意向
        {
          path: 'investment-intent',
          meta: {
            requireAuth: true,
          },
          component: InvestmentIntent
        }
      ]
    },
    //参与合投
    {
      path: '/project/project-detail/investment-intent/participate-investment',
      meta: {
        requireAuth: true,
        keepAlive: true
      },
      component: ParticipateInvestment,
    },
    // 投资意向编辑页
    {
      path: '/project/project-detail/investment-intent/investment-edit',
      component: InvestmentEdit
    },
    //投资意向详情页
    {
      path: '/project/project-detail/investment-detail',
      component: InvestmentDetail
    },
    // 项目进展  详情页
    {
      path: '/project/project-detail/progress-detail',
      component: ProgressDetail
    },
    // 消息
    {
      path: '/msg',
      redirect: '/msg/station',
      component: Msg,
      children: [
        {
          path: 'station',
          component: Station
        },
        {
          path: 'system-notification',
          component: SystemNotification
        }
      ]
    },
    // 我的
    {
      path: '/mine',
      component: Mine
    },
    //安全设置
    {
      path: '/mine/security',
      meta: {
        requireAuth: true,
      },
      component: Security
    },
    //安全设置   关于我们
    {
      path: '/about-us',
      component: AboutUs
    },
    // 关于我们 巴西分公司
    {
      path: '/brazil-branch',
      component: BrazilBranch
    },
    // 关于我们 业务领域
    {
      path: '/business-area',
      component: BusinessArea
    },
    //关于我们 公司简介
    {
      path: '/company-profile',
      component: CompanyProfile
    },
    //关于我们  联系我们
    {
      path: '/contact-us',
      component: ContactUs
    },
    //关于我们 伊朗分公司
    {
      path: '/iranian-branch',
      component: IranianBranch
    },
    //安全设置   邮箱绑定
    {
      path: '/security-email',
      component: SecurityEmail
    },
    //安全设置   意见反馈
    {
      path: '/security-feedback',
      component: SecurityFeedback
    },
    //安全设置   登录密码
    {
      path: '/security-loginpwd',
      component: SecurityLoginpwd
    },
    //安全设置   手机绑定
    {
      path: '/security-phone',
      component: SecurityPhone
    },

    //实名认证
    {
      path: '/mine/IdentityVerification',
      meta: {
        requireAuth: true,
      },
      component: IdentityVerification
    },
    {
      path: '/mine/identity',
      component: IdentitySuccess
    },
    //会员中心
    {
      path: '/mine/member-center',
      component: MemberCenter
    },
    //开通会员
    {
      path: '/mine/member-center/open-member',
      component: OpenMember
    },
    //会员介绍
    {
      path: '/mine/member-center/member-induction',
      component: MemberInduction
    },
    //充值页
    {
      path: '/mine/recharge',
      component: Recharge
    },
    //账单明细
    {
      path: '/mine/recharge/bill-detail',
      component: BillDetail
    },
    //支付页
    {
      path: '/mine/recharge/payment',
      component: Payment
    },
    //支付成功
    {
      path: '/mine/recharge/pay-successful',
      component: paySuccessful
    },
    //积分页
    {
      path: '/mine/scores',
      component: Scores
    },
    //积分明细
    {
      path: '/mine/scores/scores-detail',
      component: ScoresDetail
    },
    //会员等级
    {
      path: '/mine/member-dredge',
      component: MemberDredge
    },
    //项目收藏
    {
      path: '/mine/my-favorite',
      meta: {
        requireAuth: true,
      },
      component: MyFavorite
    },
    //个人资料
    {
      path: '/mine/my-profile',
      component: MyProfile
    },
    //修改个人资料  动态路由
    {
      path: '/mine/change-key/:id/**',
      component: ChangeKey
    },
    //修改国家
    {
      path: '/mine/change-country/:id',
      component: ChangeCountry
    },
    //关注国家和行业
    {
      path: '/mine/focus-country/:id/:value',
      component: FocusCountry
    },
    // 注册页面
    {
      path: '/register',
      component: Register,
      meta: {keepAlive: true}
    },
    // 找回密码页面
    {
      path: '/resetpwd',
      component: Resetpwd
    },
    // 验证码登录页面
    {
      path: '/authcode',
      component: Authcode
    },
    // 用户注册协议
    {
      path: '/deal',
      component: Deal
    }
  ]
})
