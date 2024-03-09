var StatusCodes;
(function (StatusCodes) {
    StatusCodes[StatusCodes["OK"] = 200] = "OK";
    StatusCodes[StatusCodes["Created"] = 201] = "Created";
    StatusCodes[StatusCodes["BadRequest"] = 400] = "BadRequest";
    StatusCodes[StatusCodes["Unauthorized"] = 401] = "Unauthorized";
    StatusCodes[StatusCodes["Forbidden"] = 403] = "Forbidden";
    StatusCodes[StatusCodes["NotFound"] = 404] = "NotFound";
})(StatusCodes || (StatusCodes = {}));
