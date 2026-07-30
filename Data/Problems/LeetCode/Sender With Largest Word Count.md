# 2284. Sender With Largest Word Count

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/sender-with-largest-word-count](https://leetcode.com/problems/sender-with-largest-word-count)
**Companies:** Google

---

## Problem Description

Given `messages` and `senders` arrays, find the sender with the most total words. Ties broken by lexicographically largest name.

---

## Approach

```text
FUNCTION largestWordCount(messages, senders):
    // Count total words per sender
    countMap ← MAP from sender → totalWords, default 0
    FOR i ← 0 TO LENGTH(messages) - 1:
        words ← LENGTH(messages[i].split())
        SET countMap[senders[i]] ← countMap[senders[i]] + words
    // Determine max by (words, name) tuple
    SET bestSender ← ""
    SET maxWords ← -1
    FOR sender, total IN countMap:
        IF total > maxWords OR (total = maxWords AND sender > bestSender):
            SET maxWords ← total
            SET bestSender ← sender
    RETURN bestSender
```

---

## Examples

**Example 1:**
```
Input: messages = ["Hello world", "Hi there"], senders = ["Alice", "Bob"]
Output: "Alice"
Explanation: Alice has 2 words, Bob has 2 words as well, but "Alice" > "Bob" lexicographically.
```

**Example 2:**
```
Input: messages = ["Hey", "How are you", "Good morning"], senders = ["Bob", "Bob", "Alice"]
Output: "Bob"
Explanation: Bob's total word count = 1 + 3 = 4, Alice's = 2.
```

---

## Walkthrough

| Step | Message | Sender | Words in Message | Cumulative Count |
|------|---------|--------|------------------|------------------|
| 1 | "Hello world" | Alice | 2 | Alice: 2 |
| 2 | "Hi there" | Bob | 2 | Bob: 2 |
| 3 | Compare – both have 2, choose lexicographically larger → Alice |

---

## Complexity Analysis

- **Time:** O(n·w) – each message is split into words once.
- **Space:** O(s) – map storing word count per distinct sender (s = number of unique senders).

---

## Follow‑Up Questions

1. How would you modify the solution if messages could contain punctuation?
2. Can you solve it in a single pass without storing all counts (e.g., using streaming)?
3. What if the tie‑break rule changed to the smallest lexicographic name?

---

## Key Takeaway

> Use a hash map to aggregate word counts per sender and then select the maximum by a (count, name) tuple.
