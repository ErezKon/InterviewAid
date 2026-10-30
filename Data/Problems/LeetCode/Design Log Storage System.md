# 635. Design Log Storage System

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/design-log-storage-system](https://leetcode.com/problems/design-log-storage-system)
**Companies:** Amazon, Apple, Snapchat, Snowflake

---

## Problem Description

You are given several logs, where each log contains a unique ID and timestamp. Timestamp is a string that has the following format: `Year:Month:Day:Hour:Minute:Second`, for example, `2017:01:01:23:59:59`. All domains are zero-padded decimal numbers.

Implement the `LogSystem` class:

- `LogSystem()` Initializes the `LogSystem` object.
- `void put(int id, string timestamp)` Stores the given log `(id, timestamp)` in your storage system.
- `int[] retrieve(string start, string end, string granularity)` Returns the IDs of the logs whose timestamps are within the range from `start` to `end` inclusive. `start` and `end` all have the same format as `timestamp`, and `granularity` means how precise the range should be (i.e. to the exact `Day`, `Minute`, etc.). For example, `start = "2017:01:01:23:59:59"`, `end = "2017:01:02:23:59:59"`, and `granularity = "Day"` means that we need to find the logs within the inclusive range from **Jan. 1st 2017** to **Jan. 2nd 2017**, and the `Hour`, `Minute`, and `Second` for each log entry can be ignored.

**Constraints:**
- `1 <= id <= 500`
- `2000 <= Year <= 2017`
- `1 <= Month <= 12`
- `1 <= Day <= 31`
- `0 <= Hour <= 23`
- `0 <= Minute, Second <= 59`
- `granularity` is one of the values `["Year", "Month", "Day", "Hour", "Minute", "Second"]`.
- At most `500` calls will be made to `put` and `retrieve`.

---

## Approach

```text
CLASS LogSystem:
    CONSTRUCTOR:
        logs ← []

    FUNCTION put(id, timestamp):
        APPEND (timestamp, id) TO logs

    FUNCTION retrieve(start, end, granularity):
        idx ← {"Year":4, "Month":7, "Day":10, "Hour":13, "Minute":16, "Second":19}
        i ← idx[granularity]
        s ← start[:i]
        e ← end[:i]
        RETURN [id FOR (ts, id) IN logs IF s ≤ ts[:i] ≤ e]
```

---

## Examples

```
Example 1:
  Input:
  ["LogSystem", "put", "put", "put", "retrieve", "retrieve"]
  [[], [1, "2017:01:01:23:59:59"], [2, "2017:01:01:22:59:59"], [3, "2016:01:01:00:00:00"], ["2016:01:01:01:01:01", "2017:01:01:23:00:00", "Year"], ["2016:01:01:01:01:01", "2017:01:01:23:00:00", "Hour"]]
  Output:
  [null, null, null, null, [3, 2, 1], [2, 1]]
  Explanation:
  LogSystem logSystem = new LogSystem();
  logSystem.put(1, "2017:01:01:23:59:59");
  logSystem.put(2, "2017:01:01:22:59:59");
  logSystem.put(3, "2016:01:01:00:00:00");

  // return [3,2,1], because you need to return all logs between 2016 and 2017.
  logSystem.retrieve("2016:01:01:01:01:01", "2017:01:01:23:00:00", "Year");

  // return [2,1], because you need to return all logs between Jan. 1, 2016 01:XX:XX and Jan. 1, 2017 23:XX:XX.
  // Log 3 is not returned because Jan. 1, 2016 00:00:00 comes before the start of the range.
  logSystem.retrieve("2016:01:01:01:01:01", "2017:01:01:23:00:00", "Hour");
```

---

## Walkthrough

1. **put** stores each log as a tuple `(timestamp, id)`.
2. **retrieve** maps granularity to a prefix length (e.g., "Hour" → 13 characters).
3. It slices `start` and `end` to that length, then filters stored logs whose timestamp prefix falls within the range.
4. The filtered IDs are returned in insertion order.

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(1) for `put`, O(n) for `retrieve` where n is number of stored logs |
| **Space** | O(n) to store logs |

---

## Follow-Up Questions

- How would you improve `retrieve` to O(log n) using a balanced search tree?
- Can you support deletion of logs?
- How would you handle extremely large numbers of logs with limited memory?

---

## Key Takeaway

> **Granularity maps to a string prefix length. Since timestamps are zero‑padded `YYYY:MM:DD:HH:MM:SS`, lexicographic prefix comparison equals chronological comparison.**
