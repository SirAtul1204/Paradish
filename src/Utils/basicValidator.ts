function basicValidator(data: string) {
  {
    if (data === "" || data.length === 0 || data.trim() === "") {
      return false;
    }
    return true;
  }
}

export default basicValidator;
