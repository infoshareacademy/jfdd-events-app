/**
 * Created by kristo on 21.01.16.
 */
$(function() {
    function Calendar() {
        var $board;
        var months = [
            {month: 'STYCZEŃ',numberOfDays: 31},
            {month: 'LUTY', numberOfDays: 28}, 'MARZEC', 'KWIECIEŃ', 'MAJ', 'CZERWIEC',
            'LIPIEC', 'SIERPIEŃ', 'WRZESIEŃ', 'PAŹDZIERNIK', 'LISTOPAD', 'GRUDZIEŃ'];
        var days = ['Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota', 'Niedziela'];


        function createTable() {
            var numberOfWeekDays = 7;
            var $table = $('<table>');
            for (var y = 0; y < months[0].numberOfDays; y++) {
                var $row = $('<tr>');
                for (var x = 0; x < numberOfWeekDays; x++) {
                    $row.append($('<td>').attr('x', x).attr('y', y));
                }
                $table.append($row);
            }
            return $table;
        }

        $board = $('.cal');
        $board.append(createTable());
    }
    Calendar();
});


//function daysInMonth(month,year) {
//    return new Date(year, month, 0).getDate();
//}