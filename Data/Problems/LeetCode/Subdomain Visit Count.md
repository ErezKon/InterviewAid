# 811. Subdomain Visit Count

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/subdomain-visit-count](https://leetcode.com/problems/subdomain-visit-count)
**Companies:** Google, Microsoft, Roblox, Wix

---

## Problem Description

A website domain `"discuss.leetcode.com"` consists of various subdomains. At the top level, we have `"com"`, at the next level, we have `"leetcode.com"` and at the lowest level, `"discuss.leetcode.com"`. When we visit a domain like `"discuss.leetcode.com"`, we will also visit the parent domains `"leetcode.com"` and `"com"` implicitly.

A **count-paired domain** is a domain that has one of the two formats `"rep d1.d2.d3"` or `"rep d1.d2"` where `rep` is the number of visits to the domain and `d1.d2.d3` is the domain itself.

- For example, `"9001 discuss.leetcode.com"` is a **count-paired domain** that indicates that `discuss.leetcode.com` was visited `9001` times.

Given an array of **count-paired domains** `cpdomains`, return *an array of the **count-paired domains** of each subdomain in the input*. You may return the answer in **any order**.

**Constraints:**
- `1 <= cpdomain.length <= 100`
- `1 <= cpdomain[i].length <= 100`
- `cpdomain[i]` follows either the `"rep_i d1_i.d2_i.d3_i"` format or the `"rep_i d1_i.d2_i"` format.
- `rep_i` is an integer in the range `[1, 10^4]`.
- `d1_i`, `d2_i`, and `d3_i` consist of lowercase English letters.

## Examples

**Example 1:**
```
Input: cpdomains = ["9001 discuss.leetcode.com"]
Output: ["9001 leetcode.com","9001 discuss.leetcode.com","9001 com"]
Explanation: We only have one website domain: "discuss.leetcode.com".
As discussed above, the subdomain "leetcode.com" and "com" will also be visited. So they will all be visited 9001 times.
```

**Example 2:**
```
Input: cpdomains = ["900 google.mail.com", "50 yahoo.com", "1 intel.mail.com", "5 wiki.org"]
Output: ["901 mail.com","50 yahoo.com","900 google.mail.com","5 wiki.org","5 org","1 intel.mail.com","951 com"]
Explanation: We will visit "google.mail.com" 900 times, "yahoo.com" 50 times, "intel.mail.com" once and "wiki.org" 5 times.
For the subdomains, we will visit "mail.com" 900 + 1 = 901 times, "com" 900 + 50 + 1 = 951 times, and "org" 5 times.
```

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
