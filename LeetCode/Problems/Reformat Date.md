# 1507. Reformat Date

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/reformat-date](https://leetcode.com/problems/reformat-date)
**Companies:** Adobe, Expedia, Oracle, Twilio

---

```
FUNCTION reformatDate(date):
    months = {"Jan":"01","Feb":"02","Mar":"03","Apr":"04","May":"05","Jun":"06",
              "Jul":"07","Aug":"08","Sep":"09","Oct":"10","Nov":"11","Dec":"12"}
    parts = date.split()
    day = parts[0][:-2].zfill(2)
    month = months[parts[1]]
    year = parts[2]
    RETURN f"{year}-{month}-{day}"
```
