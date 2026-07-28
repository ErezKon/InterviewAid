# 811. Subdomain Visit Count

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/subdomain-visit-count](https://leetcode.com/problems/subdomain-visit-count)
**Companies:** Google, Microsoft, Roblox, Wix

---

## Problem Description
Given a list of count-paired domains `cpdomains`, where each element is a string formatted as `"count domain"` (e.g., `"9001 discuss.leetcode.com"`), compute the total number of visits to each subdomain. A visit to a domain also counts as a visit to all its parent subdomains. Return the results as an array of strings in the format `"count subdomain"`.

## Examples
- **Input:** `["9001 discuss.leetcode.com"]`
  **Output:** `["9001 com", "9001 leetcode.com", "9001 discuss.leetcode.com"]`
- **Input:** `["900 google.mail.com", "50 yahoo.com", "1 intel.mail.com", "5 wiki.org"]`
  **Output:** `["901 com", "900 google.mail.com", "50 yahoo.com", "951 mail.com", "1 intel.mail.com", "5 org", "5 wiki.org"]`

## Approach
The problem is solved by parsing each entry, splitting the domain into its components, and aggregating counts for every suffix using a hash map.

```text
FUNCTION SubdomainVisits(cpdomains):
    SET countMap ← empty hash map
    FOR entry IN cpdomains:
        SET visitStr, domainStr ← SPLIT(entry, " ")
        SET visits ← TO_INTEGER(visitStr)
        SET parts ← SPLIT(domainStr, ".")
        FOR i ← 0 TO LENGTH(parts) - 1:
            SET subdomain ← JOIN(parts[i TO END], ".")
            INCREMENT countMap[subdomain] BY visits
    SET result ← empty list
    FOR subdomain, total IN countMap:
        APPEND (total + " " + subdomain) TO result
    RETURN result
```

## Walkthrough
| Step | Input Entry | Parts | Subdomains Generated | Count Map Updates |
|------|-------------|-------|----------------------|-------------------|
| 1 | `"9001 discuss.leetcode.com"` | `["discuss","leetcode","com"]` | `com`, `leetcode.com`, `discuss.leetcode.com` | `com:9001`, `leetcode.com:9001`, `discuss.leetcode.com:9001` |
| 2 | `"50 yahoo.com"` | `["yahoo","com"]` | `com`, `yahoo.com` | `com:9051`, `yahoo.com:50` |

## Complexity Analysis
- **Time:** O(N * L) where N is the number of entries and L is the average number of subdomain levels.
- **Space:** O(M) for the hash map storing M unique subdomains.

## Follow-Up Questions
- How would you modify the solution to handle extremely large input streams that cannot fit in memory?
- Can the algorithm be parallelized to process entries concurrently?
- How would you extend it to support queries for the total visits of a specific subdomain prefix?

## Key Takeaway
Aggregating counts for all suffixes of each domain using a hash map efficiently yields the required visit totals for every subdomain.
