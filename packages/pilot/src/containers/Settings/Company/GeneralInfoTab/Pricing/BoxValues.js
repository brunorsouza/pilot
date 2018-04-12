import React from 'react'
import PropTypes from 'prop-types'
import { Col } from 'former-kit'

import style from './style.css'

const BoxValues = ({
  t,
  title,
  services,
}) =>
  (
    <Col
      palm={12}
      tablet={12}
      desk={title === 'gateway' ? 12 : 6}
      tv={title === 'gateway' ? 12 : 6}
    >
      <h3 className={style.header}>{t('settings.company.card.general.rate.'.concat(title))}</h3>
      <div className={style.services}>
        { services.map(({ title: serviceTitle, price }) => price &&
          <div key={serviceTitle}>
            <span className={style.subHeader}>
              {t('settings.company.card.general.rate.'.concat(serviceTitle))}
            </span>
            <p>{price}</p>
          </div>
        )}
      </div>
    </Col>
  )

BoxValues.propTypes = {
  t: PropTypes.func.isRequired,
  services: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      price: PropTypes.price,
    })
  ).isRequired,
  title: PropTypes.string.isRequired,
}

export default BoxValues
