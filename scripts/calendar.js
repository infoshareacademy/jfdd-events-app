/**
 * Created by kristo on 21.01.16.
 */
$(function() {
    function Calendar() {
        var $board;
        var daysInMonth = function (month,year) {
            return new Date(year, month, 0).getDate();
        };
        var months = [
            'STYCZEŃ', 'LUTY', 'MARZEC', 'KWIECIEŃ', 'MAJ', 'CZERWIEC',
            'LIPIEC', 'SIERPIEŃ', 'WRZESIEŃ', 'PAŹDZIERNIK', 'LISTOPAD', 'GRUDZIEŃ'];
        var days = ['Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota', 'Niedziela'];


        function createTable() {
            var numberOfDays = 7;
            var numberOfWeeks = daysInMonth(months.indexOf(months[0]),2015)%7;
            var $table = $('<table>');
            for (var y = 0; y < numberOfWeeks; y++) {
                var $row = $('<tr>');
                for (var x = 0; x < numberOfDays; x++) {
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