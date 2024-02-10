def getSales(item) -> dict:
        return {
            "time": item["time"],
            "Section1": item["Section1"],
            "Section2": item["Section2"],
            "Section3": item["Section3"],
            "Section4": item["Section4"],
            "Section5": item["Section5"],
            "Section6": item["Section6"],
            "SectionNames": item["SectionNames"]
        }


def salesData(values) -> list:
    return [getSales(item) for item in values if getSales(item) is not None]
