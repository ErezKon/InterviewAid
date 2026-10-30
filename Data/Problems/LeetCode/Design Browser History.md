# 1472. Design Browser History

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/design-browser-history](https://leetcode.com/problems/design-browser-history)
**Companies:** Amazon, Apple, Bloomberg, Chime, Doordash, Goldman Sachs, Google, Microsoft, Roblox, Rokt, Snapchat, Snowflake, Uber

---

## Problem Description

You have a **browser** of one tab where you start on the `homepage` and you can visit another `url`, get back in the history number of `steps` or move forward in the history number of `steps`.

Implement the `BrowserHistory` class:

- `BrowserHistory(string homepage)` Initializes the object with the `homepage` of the browser.
- `void visit(string url)` Visits `url` from the current page. It clears up all the forward history.
- `string back(int steps)` Move `steps` back in history. If you can only return `x` steps in the history and `steps > x`, you will return only `x` steps. Return the current `url` after moving back in history **at most** `steps`.
- `string forward(int steps)` Move `steps` forward in history. If you can only forward `x` steps in the history and `steps > x`, you will forward only `x` steps. Return the current `url` after forwarding in history **at most** `steps`.

**Constraints:**

- `1 <= homepage.length <= 20`
- `1 <= url.length <= 20`
- `1 <= steps <= 100`
- `homepage` and `url` consist of `'.'` or lower case English letters.
- At most `5000` calls will be made to `visit`, `back`, and `forward`.

---

## Examples

```
Example 1:
  Input:
  ["BrowserHistory","visit","visit","visit","back","back","forward","visit","forward","back","back"]
  [["leetcode.com"],["google.com"],["facebook.com"],["youtube.com"],[1],[1],[1],["linkedin.com"],[2],[2],[7]]
  Output:
  [null,null,null,null,"facebook.com","google.com","facebook.com",null,"linkedin.com","google.com","leetcode.com"]
  Explanation:
  BrowserHistory browserHistory = new BrowserHistory("leetcode.com");
  browserHistory.visit("google.com");       // You are in "leetcode.com". Visit "google.com"
  browserHistory.visit("facebook.com");     // You are in "google.com". Visit "facebook.com"
  browserHistory.visit("youtube.com");      // You are in "facebook.com". Visit "youtube.com"
  browserHistory.back(1);                   // You are in "youtube.com", move back to "facebook.com" return "facebook.com"
  browserHistory.back(1);                   // You are in "facebook.com", move back to "google.com" return "google.com"
  browserHistory.forward(1);                // You are in "google.com", move forward to "facebook.com" return "facebook.com"
  browserHistory.visit("linkedin.com");     // You are in "facebook.com". Visit "linkedin.com"
  browserHistory.forward(2);                // You are in "linkedin.com", you cannot move forward any steps.
  browserHistory.back(2);                   // You are in "linkedin.com", move back two steps to "facebook.com" then to "google.com". return "google.com"
  browserHistory.back(7);                   // You are in "google.com", you can move back only one step to "leetcode.com". return "leetcode.com"
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