import { allowedDomains } from "../config.js";

function checkDomain(domain: string) {
  return allowedDomains.includes(domain);
}

export { checkDomain };
