function basicValidator(data: string): boolean {
  {
    if (data === "" || data.length === 0 || data.trim() === "") {
      return false;
    }
    return true;
  }
}

export default basicValidator;
