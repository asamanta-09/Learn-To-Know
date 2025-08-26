import styles from '../css/DropdownSubMenu.module.css'

const DropdownSubMenu = ({ subItems }) => {
  return (
    <div className={styles['sub-menu']}>
      {Object.values(subItems).map((item) => (
        <div>
          <div className={styles['course-submenu-item']}>
            <span className={styles['item-name']}>{item}</span>
          </div>
          <hr className={styles["hr-underline-course-nav"]} />
        </div>
      ))}
    </div>
  )
}

export default DropdownSubMenu;