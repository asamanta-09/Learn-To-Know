import DropdownSubMenu from './DropdownSubMenu';
import styles from '../css/DropdownMenu.module.css';
import { IoIosArrowForward } from "react-icons/io";

const DropdownMenu = ({ menuItem }) => {
  return (
    <div className={styles['container-menu']}>
      {Object.values(menuItem).map((item) => (
        <div key={item.name}>
          <div className={styles['course-menu-item']}>
            <span className={styles['item-name']}>
              {item.name}
              {item.subItem && <IoIosArrowForward />}
            </span>
            <div className={styles["dropdown-menu-item"]}>
              {item.subItem && <DropdownSubMenu subItems={item.subItem} />}
            </div>
          </div>
          <hr className={styles["hr-underline-course-nav"]} />
        </div>
      ))}
    </div>
  );
}

export default DropdownMenu;
