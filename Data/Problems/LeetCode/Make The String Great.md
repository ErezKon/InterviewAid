# 1544. Make The String Great

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/make-the-string-great](https://leetcode.com/problems/make-the-string-great)
**Companies:** Amazon, Blackstone, Bloomberg, Google

---

## 1. Problem Description

Given a string `s` of lower and upper case English letters.

A good string is a string which doesn't have **two adjacent characters** `s[i]` and `s[i + 1]` where:

- `0 <= i <= s.length - 2`
- `s[i]` is a lower-case letter and `s[i + 1]` is the same letter but in upper-case or **vice-versa**.

To make the string good, you can choose **two adjacent** characters that make the string bad and remove them. You can keep doing this until the string becomes good.

Return *the string* after making it good. The answer is guaranteed to be unique under the given constraints.

**Notice** that an empty string is also good.

**Constraints:**

- `1 <= s.length <= 100`
- `s` contains only lower and upper case English letters.

---

## 2. Approach: Stack — O(n) ✅

```text
FUNCTION makeGood(s):
    stack ← []
    FOR c IN s:
        IF stack AND stack[-1] != c AND LOWER(stack[-1]) == LOWER(c):
            POP(stack)
        ELSE:
            PUSH(stack, c)
    RETURN JOIN(stack)
```

| Time | Space |
|------|-------|
| O(n) | O(n) |

---

## 3. Examples

```
Example 1:
  Input: s = "leEeetcode"
  Output: "leetcode"
  Explanation: In the first step, either you choose i = 1 or i = 2, both will result "leEeetcode" to be reduced to "leetcode".
```

```
Example 2:
  Input: s = "abBAcC"
  Output: ""
  Explanation: We have many possible scenarios, and all lead to the same answer. For example:
  "abBAcC" --> "aAcC" --> "cC" --> ""
  "abBAcC" --> "abBA" --> "aA" --> ""
```

```
Example 3:
  Input: s = "s"
  Output: "s"
```

---

## 4. Walkthrough

| Step | Current char | Stack content | Action |
|------|--------------|---------------|--------|
| 1 | `l` | [] | PUSH → [l]
| 2 | `e` | [l] | PUSH → [l, e]
| 3 | `E` | [l, e] | Top `e` opposite case → POP → [l]
| 4 | `e` | [l] | PUSH → [l, e]
| 5 | `e` | [l, e] | Same case, PUSH → [l, e, e]
| ... | ... | ... | ... |

---

## 5. Complexity Analysis

- **Time:** Each character processed once → O(n).
- **Space:** Stack may hold up to n characters in worst case → O(n).

---

## 6. Follow-Up Questions

- How would you modify the algorithm to allow removal of any adjacent pair of identical characters regardless of case?
- Can you solve the problem in O(1) extra space by using the input string as a mutable buffer?

---

## 7. Key Takeaway

> Use a stack to cancel out adjacent opposite‑case letters, yielding the final “good” string.
