import { Link } from 'react-router-dom'

import styles from './link.module.css'

type LinkProps = {
  text: string
  textLink: string
  routePage: string
}

export const LinkModule = (props: LinkProps): React.JSX.Element => {
  const { text, textLink, routePage } = props

  return (
    <div className={styles.linkContainer}>
      <p className="text text_type_main-small text_color_inactive">{text}</p>
      <Link to={routePage} className="text text_type_main-small">
        {' '}
        {textLink}
      </Link>
    </div>
  )
}
