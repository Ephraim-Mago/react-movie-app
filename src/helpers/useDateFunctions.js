export default function useDateFunctions() {
    const formatDate = (date, options = 1) => {
        const newDate = new Date(date);

        return new Intl.DateTimeFormat("en-US", {
            year: (options == 1 ? "numeric" : "numeric"),
            month: (options == 1 ? "long" : "short"),
            day: (options == 1 ? "numeric" : "2-digit"),
        })
            .format(newDate)
            .toString();
    };

    const getAge = (date) => {
        let dob = new Date(date);

        let month = Date.now() - dob.getTime();

        let age_dt = new Date(month);

        let year = age_dt.getUTCFullYear();

        return Math.abs(year - 1970);
    };

    return {
        formatDate,
        getAge,
    };
}
