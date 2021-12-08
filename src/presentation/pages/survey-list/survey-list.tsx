import React from 'react'
import Styles from './survey-list-styles.scss'

import { Footer, Header, Icon, IconName } from '@/presentation/components'

const SurveyList: React.FC = () => {
  return (
    <div className={Styles.surveyListWrap}>
      <Header />

      <div className={Styles.contentWrap}>
        <h2>Enquetes</h2>

        <ul>
          <li>
            <div className={Styles.surveyContent}>
              <Icon iconName={IconName.thumbDown} className={Styles.iconWrap} />

              <time>
                <span className={Styles.day}>26</span>
                <span className={Styles.month}>08</span>
                <span className={Styles.year}>2021</span>
              </time>

              <p>Qual é o seu framework web favorito?</p>
            </div>

            <footer>Ver Resultado</footer>
          </li>
        </ul>
      </div>

      <Footer />
    </div>
  )
}

export default SurveyList
