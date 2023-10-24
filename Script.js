const apiKey = '66b72799';
        const apiUrl = 'http://www.omdbapi.com/';

        $('#search-form').on('submit', function (e) {
            e.preventDefault();
            const title = $('#movie-title').val();
            const type = $('#movie-type').val();
            searchMovies(title, type);
            $('#movie-details').empty();//видалити докладну інформацію про фільм з попереднього запиту
        });

        function searchMovies(title, type, page = 1) {//виконує запит до OMDB API з використанням jQuery методу
            $.get(apiUrl, { apiKey, s: title, type, page, r: 'json' })
                .done(function (data) {
                    if (data.Response === 'True') {
                        displayMovies(data.Search);
                        displayPagination(data.totalResults, page);
                    } else {
                        $('#movies').html('Movie not found!');
                        $('#pagination').empty();
                    }
                });
        }

        function displayMovies(movies) {//отримує список фільмів і створює HTML-код для кожного фільму
            const moviesList = movies.map(movie => {
                return `<div class="movie-item">
                            <img class="image-item" src="${movie.Poster}" alt="${movie.Title} Poster">                            
                            <div class="text-item">
                                <h4>${movie.Title}</h4>                            
                                <p>Type: ${movie.Type}</p>
                                <p>Year: ${movie.Year}</p>                            
                                <button class="details-button" data-id="${movie.imdbID}">Details</button>
                            </div> 
                        </div>`;
            }).join('');
            $('#movies').html(moviesList);

            $('.details-button').on('click', function () {
                const movieId = $(this).data('id');
                showMovieDetails(movieId);
            });
        }

        function displayPagination(totalResults, currentPage) {//обчислює загальну кількість сторінок
            const totalPages = Math.ceil(totalResults / 10);
            const paginationButtons = [];
            for (let i = 1; i <= totalPages; i++) {
                const activeClass = i === currentPage ? 'active' : '';
                paginationButtons.push(`<button class="page-button ${activeClass}" data-page="${i}">${i}</button>`);
            }
            $('#pagination').html(paginationButtons.join(''));

            $('.page-button').on('click', function () {
                const page = $(this).data('page');
                searchMovies($('#movie-title').val(), $('#movie-type').val(), page);
            });
        }

        function showMovieDetails(movieId) {//відображає докладну інформацію про фільм при кліку на кнопку
            $.get(apiUrl, { apiKey, i: movieId })
                .done(function (data) {
                    if (data.Response === 'True') {
                        const details = `<div class="movie-Details">                                            
                                            <img class="Details-img" src="${data.Poster}" alt="${data.Title} Poster">                                            
                                            <div class="Details-text">
                                                <table>
                                                    <tr>
                                                        <td>Title:</td>
                                                        <td>${data.Title}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Released:</td>
                                                        <td>${data.Released}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Genre:</td>
                                                        <td>${data.Genre}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Country:</td>
                                                        <td>${data.Country}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Director:</td>
                                                        <td>${data.Director}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Writer:</td>
                                                        <td>${data.Writer}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Actors:</td>
                                                        <td>${data.Actors}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Awards:</td>
                                                        <td>${data.Awards}</td>
                                                    </tr>
                                                                  
                                                </table>  
                                            </div>
                                        </div>`;
                        $('#movie-details').html(details);
                    } else {
                        $('#movie-details').html('Details not found!');
                    }
                });
        }

        // function showMovieDetails(movieId) {
        //     $.get(apiUrl, { apiKey, i: movieId })
        //         .done(function (data) {
        //             if (data.Response === 'True') {
        //                 const details = `<div class="movie-Details">
        //                                     <div class="Details-img">
        //                                         <img src="${data.Poster}" alt="${data.Title} Poster">
        //                                     </div>
        //                                     <div class="Details-text">
        //                                         <h2>${data.Title}</h2>
        //                                         <p>Type: ${data.Type}</p>
        //                                         <p>Year: ${data.Year}</p>
        //                                         <p>Plot: ${data.Plot}</p>
        //                                         <p>Director: ${data.Director}</p>
        //                                     </div>

        //                                 </div>`;
        //                 $('#movie-details').html(details);
        //             } else {
        //                 $('#movie-details').html('Details not found!');
        //             }
        //         });
        // }

        // function showMovieDetails(movieId) {
        //     $.get(apiUrl, { apiKey, i: movieId })
        //         .done(function (data) {
        //             if (data.Response === 'True') {
        //                 const details = `<h2>${data.Title}</h2>
        //                                 <p>Type: ${data.Type}</p>
        //                                 <p>Year: ${data.Year}</p>
        //                                 <p>Plot: ${data.Plot}</p>
        //                                 <p>Director: ${data.Director}</p>`;
        //                 $('#movie-details').html(details);
        //             } else {
        //                 $('#movie-details').html('Details not found!');
        //             }
        //         });
        // }