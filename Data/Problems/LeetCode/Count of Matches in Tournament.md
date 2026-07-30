# 1688. Count of Matches in Tournament

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/count-of-matches-in-tournament](https://leetcode.com/problems/count-of-matches-in-tournament)
**Companies:** Amazon, Google, Meta, Microsoft

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

You are given an integer `n`, the number of teams in a tournament. The tournament rules:
- If even number of teams: `n / 2` matches are played, `n / 2` teams advance.
- If odd number of teams: `(n - 1) / 2` matches are played, `(n - 1) / 2 + 1` teams advance (one gets a bye).

Return the total number of matches played until a winner is decided.

**Constraints:**
- `1 <= n <= 200`

---

## Examples

**Example 1:**
- **Input:** `n = 7`
- **Output:** `6`
- **Explanation:** Round 1: 3 matches (7→4), Round 2: 2 matches (4→2), Round 3: 1 match (2→1). Total = 3+2+1 = 6.

**Example 2:**
- **Input:** `n = 14`
- **Output:** `13`
- **Explanation:** Each match eliminates one team. 13 teams must be eliminated → 13 matches.

---

## Key Insight

Every match eliminates **exactly one** team. To go from `n` teams to 1 winner, you must eliminate `n - 1` teams. Therefore, exactly `n - 1` matches are played, regardless of the bracket structure.

---

## Approach

```
FUNCTION numberOfMatches(n):
    RETURN n - 1
```

That's it — a one-liner. The simulation approach (looping round by round) also works but is unnecessary:

```
FUNCTION numberOfMatchesSimulation(n):
    total ← 0
    WHILE n > 1 DO
        total += n / 2
        n ← n / 2 + n % 2
    RETURN total
```

---

## Walkthrough

**Input:** `n = 7`

```
Round 1: 7 teams → 3 matches, 1 bye → 4 teams advance
Round 2: 4 teams → 2 matches           → 2 teams advance
Round 3: 2 teams → 1 match             → 1 winner
Total matches: 3 + 2 + 1 = 6 = 7 - 1 ✅
```

**Mathematical proof:** Each match produces exactly 1 loser. We need n−1 losers. QED.

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(1) |
| **Space** | O(1) |

---

## Follow-Up Questions

**Q1: What if each match can have a draw (no elimination)?**
Then the invariant breaks. You'd need to simulate or model the expected number of matches with probabilities.

**Q2: What if it's a double-elimination tournament?**
A team must lose twice to be eliminated. Total matches = `2(n - 1)` or `2n - 1` depending on whether the final's winner also came from the losers' bracket.

**Q3: Can you prove the simulation gives `n - 1` formally?**
Sum of `⌊n/2⌋` over rounds telescopes. Each round removes `⌊n/2⌋` teams, ceiling the remainder. The total sum equals `n - 1`.

---

## Key Takeaway

> **When each operation eliminates exactly one item, the total operations = items − 1. Recognize this invariant to bypass simulation entirely.**
