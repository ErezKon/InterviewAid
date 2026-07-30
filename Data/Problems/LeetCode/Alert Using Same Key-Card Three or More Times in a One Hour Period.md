# 1604. Alert Using Same Key-Card Three or More Times in a One Hour Period

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/alert-using-same-key-card-three-or-more-times-in-a-one-hour-period](https://leetcode.com/problems/alert-using-same-key-card-three-or-more-times-in-a-one-hour-period)
**Companies:** Ibm, Karat, Snowflake, Stripe, Wayfair

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Sort + Sliding Window — O(n log n) ✅](#4-approach-sort--sliding-window--on-log-n-)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Problem Description

Given arrays `keyName` and `keyTime` of equal length, where `keyName[i]` used their key-card at time `keyTime[i]` (in `"HH:MM"` format), return a sorted list of names who used their key-card **three or more times in a one-hour period**.

**Constraints:**
- `1 ≤ keyName.length ≤ 10⁵`
- Times are in `"HH:MM"` format, 24-hour clock

---

## 2. Examples

```
Example:
  Input:  keyName = ["daniel","daniel","daniel","luis","luis","luis","luis"],
          keyTime = ["10:00","10:40","11:00","09:00","11:00","13:00","15:00"]
  Output: ["daniel"]
  Explanation: Daniel used card at 10:00, 10:40, 11:00 — 3 uses within 60 min.
```

---

## 3. Key Insight

> Group times by person, sort each group, then check if any sliding window of 3 consecutive times spans ≤ 60 minutes. If `times[i] - times[i-2] ≤ 60`, there are 3 uses within one hour.

---

## 4. Approach: Sort + Sliding Window — O(n log n) ✅

```
FUNCTION alertNames(keyName, keyTime):
    usage = defaultdict(list)
    FOR name, time IN zip(keyName, keyTime):
        minutes = int(time[:2]) * 60 + int(time[3:])
        usage[name].ADD(minutes)

    result = []
    FOR name, times IN usage.items():
        SORT times
        FOR i ← 2 TO len(times) - 1:
            IF times[i] - times[i-2] <= 60:
                result.ADD(name)
                BREAK

    RETURN sorted(result)
```

---

## 5. Walkthrough

```
Daniel's times: ["10:00","10:40","11:00"] → [600, 640, 660]
Sorted: [600, 640, 660]
i=2: 660 - 600 = 60 ≤ 60 → ALERT ✓

Luis's times: ["09:00","11:00","13:00","15:00"] → [540, 660, 780, 900]
i=2: 780 - 540 = 240 > 60
i=3: 900 - 660 = 240 > 60 → no alert

Result: ["daniel"] ✅
```

---

## 6. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n log n) — sorting per person |
| **Space** | O(n) — grouped times |

---

## 7. Key Takeaway

> Group by person, sort times, sliding window of size 3. The check `times[i] - times[i-2] ≤ 60` elegantly detects 3 uses within one hour — no need for a complex window structure.
