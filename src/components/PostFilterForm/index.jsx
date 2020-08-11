import React, { useState, useRef } from "react";
import PropTypes from "prop-types";

PostFilterForm.propTypes = {
  onSubmit: PropTypes.func,
};

PostFilterForm.defaultProps = {
  onSubmit: null,
};

function PostFilterForm(props) {
  const [search, setSearch] = useState("");
  const { onSubmit } = props;
  const typingTimeOutRef = useRef(null); //giữ 1 object từ lúc component tạo ra đến mất đi, dù render lại thì object này vẫn ko thay đổi
  function handleSearchChange(e) {
    const value = e.target.value;
    setSearch(value);
    if (!onSubmit) return;

    if (typingTimeOutRef.current) {
      console.log(typingTimeOutRef.current);
      clearTimeout(typingTimeOutRef.current);
    }

    typingTimeOutRef.current = setTimeout(() => {
      const searchForm = {
        search: value,
      };
      onSubmit(searchForm);
    }, 300);
  }

  return (
    <form>
      <input onChange={handleSearchChange} value={search} type="text" />
    </form>
  );
}

export default PostFilterForm;
