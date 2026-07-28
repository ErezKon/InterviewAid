# 1410. HTML Entity Parser

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/html-entity-parser](https://leetcode.com/problems/html-entity-parser)
**Companies:** Amazon, Google, Oracle

---

## Problem Description
Given a string `text` that may contain HTML entity codes such as `&quot;`, `&apos;`, `&amp;`, `&gt;`, `&lt;`, and `&frasl;`, replace each entity with its corresponding character and return the resulting string. The input string consists only of printable ASCII characters.

## Examples
**Example 1:**
```
Input: "&amp; is an HTML entity but &ambassador; is not."
Output: "& is an HTML entity but &ambassador; is not."
```
**Example 2:**
```
Input: "&lt;div&gt;Hello &quot;World&quot;&lt;/div&gt;"
Output: "<div>Hello \"World\"</div>"
```

## Approach
Use a hash map to store the mapping from each entity string to its character. Iterate over the map and replace all occurrences of each entity in the input text.

```text
FUNCTION entityParser(text):
    SET entities ← {"&quot;": '"', "&apos;": "'", "&amp;": "&", "&gt;": ">", "&lt;": "<", "&frasl;": "/"}
    FOR each entity, char IN entities:
        SET text ← REPLACE_ALL(text, entity, char)
    RETURN text
```

## Walkthrough
| Step | Input Text | Operation | Result |
|------|------------|-----------|--------|
| 1 | "&amp; is &lt;test&gt;" | Replace `&amp;` with `&` | "& is &lt;test&gt;" |
| 2 | "& is &lt;test&gt;" | Replace `&lt;` with `<` | "& is <test&gt;" |
| 3 | "& is <test&gt;" | Replace `&gt;` with `>` | "& is <test>" |

## Complexity Analysis
- **Time:** O(n + k·m) where *n* is the length of the input string, *k* is the number of entities (constant 6), and *m* is the average length of each entity. Effectively linear in the input size.
- **Space:** O(1) extra space besides the output string (the hash map is constant size).

## Follow-Up Questions
1. How would you handle nested or overlapping entities?
2. Can you solve the problem without using built‑in replace functions?
3. How would you extend the solution to support a larger set of HTML entities?

## Key Takeaway
A simple hash‑map lookup combined with string replacement efficiently parses HTML entities in linear time.
