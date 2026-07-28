# 1472. Design Browser History

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/design-browser-history](https://leetcode.com/problems/design-browser-history)
**Companies:** Amazon, Apple, Bloomberg, Chime, Doordash, Goldman Sachs, Google, Microsoft, Roblox, Rokt, Snapchat, Snowflake, Uber

---

## Problem Description

Design browser history with `visit(url)`, `back(steps)`, `forward(steps)`. Visiting a new page clears forward history.

---

## Examples

**Example 1:**
```
Input: ["BrowserHistory","visit","visit","back","forward","visit","back"],
       [["leetcode.com"],["google.com"],["facebook.com"],[1],[1],["youtube.com"],[2]]
Output: [null,null,null,"leetcode.com","google.com",null,"leetcode.com"]
Explanation:
- BrowserHistory("leetcode.com") creates history with homepage.
- visit("google.com"), visit("facebook.com") add pages.
- back(1) moves to "google.com".
- forward(1) returns to "facebook.com".
- visit("youtube.com") clears forward history and adds new page.
- back(2) goes back to "leetcode.com".
```

**Example 2:**
```
Input: ["BrowserHistory","visit","back","back"],
       [["a.com"],["b.com"],[1],[1]]
Output: [null,null,"a.com","a.com"]
Explanation:
- After visiting "b.com", back(1) returns to "a.com".
- Another back(1) stays at "a.com" because no earlier page.
```

---

## Approach: Array/List with Pointer ✅

```
CLASS BrowserHistory:
    CONSTRUCTOR(homepage):
        SET history ← [homepage]
        SET current ← 0

    FUNCTION visit(url):
        // Truncate forward history
        SET history ← history[0..current]
        APPEND url TO history
        SET current ← current + 1

    FUNCTION back(steps):
        SET current ← MAX(0, current - steps)
        RETURN history[current]

    FUNCTION forward(steps):
        SET current ← MIN(LENGTH(history) - 1, current + steps)
        RETURN history[current]
```

---

## Walkthrough

| Step | Operation | History List | Current Index |
|------|-----------|--------------|---------------|
| 1 | `BrowserHistory("leetcode.com")` | ["leetcode.com"] | 0 |
| 2 | `visit("google.com")` | ["leetcode.com","google.com"] | 1 |
| 3 | `visit("facebook.com")` | ["leetcode.com","google.com","facebook.com"] | 2 |
| 4 | `back(1)` | unchanged | 1 (returns "google.com") |
| 5 | `forward(1)` | unchanged | 2 (returns "facebook.com") |
| 6 | `visit("youtube.com")` | ["leetcode.com","google.com","facebook.com","youtube.com"] (truncates forward) | 3 |
| 7 | `back(2)` | unchanged | 1 (returns "google.com") |

---

## Complexity Analysis

- **Time Complexity:** Each operation (`visit`, `back`, `forward`) runs in **O(1)** amortized time; truncating forward history may involve slice copy but overall linear in total operations.
- **Space Complexity:** **O(n)** where *n* is the number of visited URLs stored.

---

## Follow-Up Questions

1. How would you implement this using two stacks instead of an array?
2. How can you support a `remove(url)` operation that deletes a specific page from history?
3. What changes are needed to make the history persistent across sessions?

---

## Key Takeaway

> **Array + pointer: `visit` truncates forward history and appends, while `back`/`forward` simply move the pointer within bounds.**