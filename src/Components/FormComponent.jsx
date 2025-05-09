export default function FormGroup ({ label, type, id, className, name, options, value, placeholder, onChange, required, min, max }) {
  return (
    <div className="form-divs">
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      {type === "select" ? (
        <select id={id} className="form-select" name={name} value={value} onChange={onChange} required>
          {options.map((opt, idx) => (
            <option key={idx} value={opt.value} disabled={opt.disabled || false}>
              {opt.text}
            </option>
          ))}
        </select>
      ) : type === "number" ? (
        <input
          type={type}
          id={id}
          className={className}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          min={min}
          max={max}
        />

      ): (
        <input
          type={type}
          id={id}
          className={className}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
        />
      )}
    </div>
  );
}