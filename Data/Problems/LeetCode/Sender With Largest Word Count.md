# 2284. Sender With Largest Word Count

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/sender-with-largest-word-count](https://leetcode.com/problems/sender-with-largest-word-count)
**Companies:** Google

---

## Problem Description

You have a chat log of `n` messages. You are given two string arrays `messages` and `senders` where `messages[i]` is a **message** sent by `senders[i]`.

A **message** is list of **words** that are separated by a single space with no leading or trailing spaces. The **word count** of a sender is the total number of **words** sent by the sender. Note that a sender may send more than one message.

Return *the sender with the **largest** word count*. If there is more than one sender with the largest word count, return *the one with the **lexicographically largest** name*.

**Note:**

- Uppercase letters come before lowercase letters in lexicographical order.
- `"Alice"` and `"alice"` are distinct.

**Constraints:**

- `n == messages.length == senders.length`
- `1 <= n <= 10^4`
- `1 <= messages[i].length <= 100`
- `1 <= senders[i].length <= 10`
- `messages[i]` consists of uppercase and lowercase English letters and `' '`.
- All the words in `messages[i]` are separated by **a single space**.
- `messages[i]` does not have leading or trailing spaces.
- `senders[i]` consists of uppercase and lowercase English letters only.

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

```
Example 1:
  Input: messages = ["Hello userTwooo","Hi userThree","Wonderful day Alice","Nice day userThree"], senders = ["Alice","userTwo","userThree","Alice"]
  Output: "Alice"
  Explanation: Alice sends a total of 2 + 3 = 5 words.
  userTwo sends a total of 2 words.
  userThree sends a total of 3 words.
  Since Alice has the largest word count, we return "Alice".
```

```
Example 2:
  Input: messages = ["How is leetcode for everyone","Leetcode is useful for practice"], senders = ["Bob","Charlie"]
  Output: "Charlie"
  Explanation: Bob sends a total of 5 words.
  Charlie sends a total of 5 words.
  Since there is a tie for the largest word count, we return the sender with the lexicographically larger name, Charlie.
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

## Follow-Up Questions

1. How would you modify the solution if messages could contain punctuation?
2. Can you solve it in a single pass without storing all counts (e.g., using streaming)?
3. What if the tie-break rule changed to the smallest lexicographic name?

---

## Key Takeaway

> Use a hash map to aggregate word counts per sender and then select the maximum by a (count, name) tuple.
