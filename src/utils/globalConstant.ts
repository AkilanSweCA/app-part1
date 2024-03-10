export const globalConstant = Object.freeze({
  internal_error: { message: "Internal server error" },
  home_owner: Object.freeze({
    not_found: { message: "Homeowner record not found" },
    already_exists: { message: "Homeowner record already exists" },
    added: {},
    updated: {},
    deleted: { message: "Homeowner record deleted successfully" },
    deleted_all: { message: "All Homeowner records are deleted successfully" },
    invalidReq: { message: "Invalid request" },
  }),
});
