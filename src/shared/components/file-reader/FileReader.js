export function FileInput({ children, className, accept = "image/*" ,onSelect}) {
  const select = (ef) => {
    const file = ef.target.files[0]
    const fileReader = new FileReader()
    fileReader.onload = (el) => {
      onSelect({file:file,src:el.target.result})
    }
    fileReader.readAsDataURL(file)
  }
  return (
    <div className={className}>
      <label
        htmlFor="file"
        className="btn btn-icon"
        style={{ padding: "0.5rem" }}
      >
        {children}
      </label>
      <input
        id="file"
        accept={accept}
        style={{ display: "none" }}
        onChange={select}
        type="file"
      />
    </div>
  );
}
