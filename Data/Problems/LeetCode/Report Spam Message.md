# 3295. Report Spam Message

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/report-spam-message](https://leetcode.com/problems/report-spam-message)
**Companies:** Ibm, Salesforce

---

## Table of Contents

- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach](#approach)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

You are given an array of strings `message` and an array of strings `bannedWords`. A message is considered **spam** if there are **at least two** words in it that match any word in `bannedWords`. Return `true` if the message is spam, `false` otherwise.

**Constraints:**
- `1 <= message.length, bannedWords.length <= 10^5`
- `1 <= message[i].length, bannedWords[i].length <= 15`
- All strings consist of lowercase English letters

---

## Examples

**Example 1:**
- **Input:** `message = ["hello","world","leetcode"]`, `bannedWords = ["world","hello"]`
- **Output:** `true`
- **Explanation:** "hello" and "world" both appear in bannedWords → 2 matches ≥ 2 → spam.

**Example 2:**
- **Input:** `message = ["hello","programming","fun"]`, `bannedWords = ["world","programming","leetcode"]`
- **Output:** `false`
- **Explanation:** Only "programming" matches → 1 match < 2 → not spam.

---

## Key Insight

> Store banned words in a **HashSet** for O(1) lookups, then iterate through the message counting matches. Short-circuit as soon as count reaches 2.

---

## Approach

```
FUNCTION ReportSpamMessage(message, bannedWords)
    bannedSet ← SET(bannedWords)
    count ← 0

    FOR EACH word IN message DO
        IF word IN bannedSet THEN
            count ← count + 1
            IF count >= 2 THEN
                RETURN true
        END IF
    END FOR

    RETURN false
END FUNCTION
```

---

## Walkthrough

`message = ["hello","world","leetcode"]`, `bannedWords = ["world","hello"]`

| Step | Word       | In bannedSet? | Count |
|------|-----------|---------------|-------|
| 1    | "hello"   | ✅ Yes        | 1     |
| 2    | "world"   | ✅ Yes        | 2 → **return true** |

---

## Complexity Analysis

| Aspect | Complexity |
|--------|-----------|
| Time   | O(n + m) — build set O(m), scan message O(n) |
| Space  | O(m) — for the banned words set |

Where n = len(message), m = len(bannedWords).

---

## Follow-Up Questions

1. **What if the threshold isn't 2 but k?**
   → Parameterize the threshold; same approach, just compare `count >= k`.

2. **What if matching should be case-insensitive?**
   → Lowercase all words before inserting/checking.

3. **What if we need to count distinct banned words matched?**
   → Remove matched words from the set after finding them to avoid counting duplicates.

---

## Key Takeaway

> HashSet membership checks turn a brute-force O(n·m) comparison into O(n + m) — the canonical pattern for "check if elements from one list appear in another."
