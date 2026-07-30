# 1843. Suspicious Bank Accounts

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/suspicious-bank-accounts](https://leetcode.com/problems/suspicious-bank-accounts)
**Companies:** Jpmorgan

---

## Problem Description
You are given an array of bank account records, each containing a `name`, `email`, and `phone`. Two accounts are considered *suspicious* if they share the same `name` and `email` but have different `phone` numbers. Return a list of all suspicious account pairs (by their indices) or an empty list if none exist.

## Examples
**Example 1:**
```
Input: accounts = [{"name":"alice","email":"a@x.com","phone":"111"},
                 {"name":"bob","email":"b@x.com","phone":"222"},
                 {"name":"alice","email":"a@x.com","phone":"333"}]
Output: [[0,2]]
Explanation: Accounts 0 and 2 share name and email but have different phones.
```

**Example 2:**
```
Input: accounts = [{"name":"carol","email":"c@x.com","phone":"444"}]
Output: []
```

## Approach
Iterate through the list and use a hash map keyed by the tuple `(name, email)`. Store the first observed phone and its index. When encountering another record with the same key but a different phone, record the pair of indices.

```text
FUNCTION findSuspicious(accounts):
    SET map ← empty map  // key → (phone, index)
    SET result ← empty list
    FOR i ← 0 TO LENGTH(accounts)-1:
        SET key ← (accounts[i].name, accounts[i].email)
        IF key NOT IN map:
            SET map[key] ← (accounts[i].phone, i)
        ELSE:
            SET (prevPhone, prevIdx) ← map[key]
            IF accounts[i].phone ≠ prevPhone:
                APPEND [prevIdx, i] TO result
    RETURN result
```

## Walkthrough
For the first example:
1. Process index 0 → map[('alice','a@x.com')] = ('111',0).
2. Index 1 → new key, store.
3. Index 2 → same key, phone '333' ≠ '111' → add pair [0,2].
Result matches expected output.

## Complexity Analysis
- **Time:** O(n) – one pass through the accounts.
- **Space:** O(n) – hash map stores at most one entry per unique `(name,email)` pair.

## Follow-Up Questions
1. How would you modify the solution to return all groups of more than two suspicious accounts?
2. Can you detect suspicious accounts when the matching criteria includes fuzzy email matching?
3. What if the dataset is streamed and cannot fit in memory?

## Key Takeaway
A simple hash map keyed by identifying fields quickly reveals conflicting records in linear time.
