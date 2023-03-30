import styles from './Content.module.css'
export function Content({ content, image }) {
  return (
    <div className={styles.content}>
      {content && <div>{content}</div>}
      {image && (
        <div>
          <img alt='a' src={image}/>
        </div>
      )}
    </div>
  );
}
